import type { ChatPayloadMessage } from "@/types/chat";

const DEFAULT_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export class AiConfigError extends Error {}

interface StreamChunk {
  choices?: { delta?: { content?: string } }[];
  response?: string;
}

export async function requestChatStream(systemPrompt: string, messages: ChatPayloadMessage[], signal: AbortSignal) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new AiConfigError("Cloudflare Workers AI credentials are not configured.");

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.CLOUDFLARE_AI_MODEL || DEFAULT_MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 700,
      temperature: 0.4,
      stream: true,
    }),
    signal,
  });

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Cloudflare AI request failed (${response.status}) ${detail.slice(0, 200)}`);
  }

  return response.body.pipeThrough(new TextDecoderStream()).pipeThrough(sseToText()).pipeThrough(new TextEncoderStream());
}

function sseToText() {
  let buffer = "";

  return new TransformStream<string, string>({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const data = line.trim().replace(/^data:\s*/, "");
        if (!data || data === "[DONE]" || !line.trim().startsWith("data:")) continue;
        try {
          const parsed = JSON.parse(data) as StreamChunk;
          const text = parsed.choices?.[0]?.delta?.content ?? parsed.response;
          if (text) controller.enqueue(text);
        } catch {
          continue;
        }
      }
    },
  });
}

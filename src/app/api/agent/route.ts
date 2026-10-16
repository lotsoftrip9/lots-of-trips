import { NextRequest, NextResponse } from "next/server";
import { AiConfigError, requestChatStream } from "@/lib/ai/cloudflare";
import { getSystemPrompt } from "@/lib/ai/prompt";
import type { ChatPayloadMessage } from "@/types/chat";

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 4000;

const isChatMessage = (m: unknown): m is ChatPayloadMessage => {
  const msg = m as Partial<ChatPayloadMessage> | null;
  return (msg?.role === "user" || msg?.role === "assistant") && typeof msg.content === "string" && msg.content.trim() !== "";
};

function mergeConsecutive(messages: ChatPayloadMessage[]) {
  return messages.reduce<ChatPayloadMessage[]>((merged, m) => {
    const last = merged.at(-1);
    if (last?.role === m.role) last.content = `${last.content}\n\n${m.content}`;
    else merged.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) });
    return merged;
  }, []);
}

function parseBody(body: unknown) {
  const { messages, page } = (body ?? {}) as { messages?: unknown; page?: unknown };
  if (!Array.isArray(messages)) return null;

  const valid = mergeConsecutive(messages.filter(isChatMessage).slice(-MAX_MESSAGES));
  while (valid[0]?.role === "assistant") valid.shift();
  if (valid.at(-1)?.role !== "user") return null;

  return { messages: valid, page: typeof page === "string" ? page.slice(0, 200) : undefined };
}

export async function POST(req: NextRequest) {
  const parsed = parseBody(await req.json().catch(() => null));
  if (!parsed) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    const stream = await requestChatStream(getSystemPrompt(parsed.page), parsed.messages, req.signal);
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Tripzy agent error:", error);
    const status = error instanceof AiConfigError ? 503 : 502;
    return NextResponse.json({ error: "Tripzy is unavailable right now." }, { status });
  }
}

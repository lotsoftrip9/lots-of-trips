import { NextRequest, NextResponse } from "next/server";
import { AiConfigError, requestChatStream } from "@/lib/ai/cloudflare";
import { getSystemPrompt } from "@/lib/ai/prompt";
import type { ChatPayloadMessage } from "@/types/chat";

const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 2000;

function parseMessages(body: unknown): ChatPayloadMessage[] | null {
  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const valid = messages.filter(
    (m): m is ChatPayloadMessage =>
      (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim() !== "",
  );
  if (valid.length === 0 || valid.at(-1)?.role !== "user") return null;

  return valid.slice(-MAX_MESSAGES).map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));
}

export async function POST(req: NextRequest) {
  const messages = parseMessages(await req.json().catch(() => null));
  if (!messages) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    const stream = await requestChatStream(getSystemPrompt(), messages, req.signal);
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Tripzy agent error:", error);
    const status = error instanceof AiConfigError ? 503 : 502;
    return NextResponse.json({ error: "Tripzy is unavailable right now." }, { status });
  }
}

import type { ChatMessage, ChatRequestBody } from "@/types/chat";

const HISTORY_CHAR_BUDGET = 14000;

export function buildHistory(messages: ChatMessage[]) {
  const usable = messages.filter((m) => !m.failed && m.content.trim());
  const history: ChatRequestBody["messages"] = [];
  let total = 0;

  for (let i = usable.length - 1; i >= 0; i--) {
    total += usable[i].content.length;
    if (total > HISTORY_CHAR_BUDGET && history.length > 0) break;
    history.unshift({ role: usable[i].role, content: usable[i].content });
  }
  return history;
}

export async function streamTripzyReply(body: ChatRequestBody, signal: AbortSignal, onText: (text: string) => void) {
  const res = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(res.statusText || "Request failed");

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += value;
    onText(text);
  }
  return text;
}

import type { ChatMessage } from "@/types/chat";

const STORAGE_KEY = "tripzy-chat";
const MAX_STORED = 40;

export function loadChat(): ChatMessage[] {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((m) => m?.id && m?.role && typeof m.content === "string") : [];
  } catch {
    return [];
  }
}

export function saveChat(messages: ChatMessage[]) {
  try {
    const usable = messages.filter((m) => m.content);
    if (usable.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(usable.slice(-MAX_STORED)));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

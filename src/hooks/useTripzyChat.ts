"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { tripzyCopy } from "@/content/tripzy";
import { buildHistory, streamTripzyReply } from "@/lib/ai/client";
import type { ChatMessage } from "@/types/chat";

const createId = () => crypto.randomUUID();

export function useTripzyChat() {
  const pathname = usePathname();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const patchMessage = (id: string, patch: Partial<ChatMessage>) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content) return;

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      const userMessage: ChatMessage = { id: createId(), role: "user", content };
      const replyId = createId();
      const history = buildHistory([...messagesRef.current, userMessage]);

      setMessages((prev) => [
        ...prev.filter((m) => m.content || m.role === "user"),
        userMessage,
        { id: replyId, role: "assistant", content: "" },
      ]);
      setIsStreaming(true);

      let reply = "";
      try {
        reply = await streamTripzyReply({ messages: history, page: pathname }, controller.signal, (partial) => {
          reply = partial;
          patchMessage(replyId, { content: partial });
        });
        if (!reply) patchMessage(replyId, { content: tripzyCopy.errorFallback, failed: true });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          patchMessage(replyId, reply ? {} : { content: tripzyCopy.errorFallback, failed: true });
        } else if (!reply) {
          setMessages((prev) => prev.filter((m) => m.id !== replyId));
        }
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
          setIsStreaming(false);
        }
      }
    },
    [pathname],
  );

  const stop = useCallback(() => controllerRef.current?.abort(), []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setIsStreaming(false);
    setMessages([]);
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { messages, isStreaming, send, stop, reset };
}

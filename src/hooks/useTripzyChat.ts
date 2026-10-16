"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { tripzyCopy } from "@/content/tripzy";
import type { ChatMessage } from "@/types/chat";

const HISTORY_LIMIT = 10;

const createId = () => crypto.randomUUID();

const greeting = (): ChatMessage => ({ id: "greeting", role: "assistant", content: tripzyCopy.greeting });

export function useTripzyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [greeting()]);
  const [isStreaming, setIsStreaming] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const updateMessage = (id: string, content: string) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content } : m)));

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isStreaming) return;

      const userMessage: ChatMessage = { id: createId(), role: "user", content };
      const replyId = createId();
      const history = [...messages.filter((m) => m.id !== "greeting"), userMessage].slice(-HISTORY_LIMIT);

      setMessages((prev) => [...prev, userMessage, { id: replyId, role: "assistant", content: "" }]);
      setIsStreaming(true);

      const controller = new AbortController();
      controllerRef.current = controller;
      let reply = "";

      try {
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content: body }) => ({ role, content: body })) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) throw new Error(res.statusText);

        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          reply += value;
          updateMessage(replyId, reply);
        }
        if (!reply) updateMessage(replyId, tripzyCopy.errorFallback);
      } catch (error) {
        if ((error as Error).name !== "AbortError") updateMessage(replyId, reply || tripzyCopy.errorFallback);
        else if (!reply) setMessages((prev) => prev.filter((m) => m.id !== replyId));
      } finally {
        controllerRef.current = null;
        setIsStreaming(false);
      }
    },
    [messages, isStreaming],
  );

  const stop = useCallback(() => controllerRef.current?.abort(), []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setMessages([greeting()]);
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { messages, isStreaming, send, stop, reset };
}

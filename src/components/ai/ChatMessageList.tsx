"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatWelcome } from "./ChatWelcome";

const STICK_THRESHOLD = 80;

interface ChatMessageListProps {
  messages: ChatMessage[];
  onPick: (prompt: string) => void;
}

export function ChatMessageList({ messages, onPick }: ChatMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const lastMessage = messages.at(-1);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && (stickRef.current || lastMessage?.role === "user")) el.scrollTop = el.scrollHeight;
  }, [messages, lastMessage]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (el) stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD;
  };

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      aria-live="polite"
      className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 text-[14.5px] leading-relaxed sm:px-5"
    >
      {messages.length === 0 && <ChatWelcome onPick={onPick} />}
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

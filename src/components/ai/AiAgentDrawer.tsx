"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useTripzyChat } from "@/hooks/useTripzyChat";
import { CUBIC } from "@/lib/motion/tokens";
import { useAiAgent } from "./AiAgentContext";
import { ChatComposer } from "./ChatComposer";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatQuoteBar } from "./ChatQuoteBar";

export function AiAgentDrawer() {
  const { isOpen, closeAgent } = useAiAgent();
  const { messages, isStreaming, send, stop, reset } = useTripzyChat();
  const isDesktop = useMediaQuery("(min-width: 40rem)");
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen && !isDesktop);
  useDismiss(panelRef, isOpen, closeAgent);

  const closeOnInternalLink = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('a[href^="/"]')) closeAgent();
  };

  const hasConversation = messages.length > 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal={!isDesktop}
          aria-labelledby="tripzy-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: CUBIC.outExpo }}
          onClickCapture={closeOnInternalLink}
          className="fixed inset-0 z-50 flex flex-col bg-snow pt-[env(safe-area-inset-top)] sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(42rem,calc(100dvh-3rem))] sm:w-100 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-line sm:pt-0 sm:shadow-2xl sm:shadow-black/20"
        >
          <ChatHeader canReset={hasConversation} onReset={reset} onClose={closeAgent} />
          <ChatMessageList messages={messages} onPick={send} />
          {hasConversation && <ChatQuoteBar />}
          <ChatComposer isStreaming={isStreaming} autoFocus={isDesktop} onSend={send} onStop={stop} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

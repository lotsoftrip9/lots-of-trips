"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/track";

interface AiAgentContextType {
  isOpen: boolean;
  pendingPrompt: string | null;
  openAgent: () => void;
  askAgent: (prompt: string) => void;
  closeAgent: () => void;
  clearPendingPrompt: () => void;
}

const AiAgentContext = createContext<AiAgentContextType | undefined>(undefined);

export function AiAgentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const openAgent = useCallback(() => {
    setIsOpen(true);
    trackEvent("tripzy_open");
  }, []);

  const askAgent = useCallback((prompt: string) => {
    setPendingPrompt(prompt);
    setIsOpen(true);
    trackEvent("tripzy_ask", { prompt });
  }, []);

  const closeAgent = useCallback(() => setIsOpen(false), []);
  const clearPendingPrompt = useCallback(() => setPendingPrompt(null), []);

  const value = useMemo(
    () => ({ isOpen, pendingPrompt, openAgent, askAgent, closeAgent, clearPendingPrompt }),
    [isOpen, pendingPrompt, openAgent, askAgent, closeAgent, clearPendingPrompt],
  );

  return <AiAgentContext.Provider value={value}>{children}</AiAgentContext.Provider>;
}

export function useAiAgent() {
  const context = useContext(AiAgentContext);
  if (!context) throw new Error("useAiAgent must be used within an AiAgentProvider");
  return context;
}

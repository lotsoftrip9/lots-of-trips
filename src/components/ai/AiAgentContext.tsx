"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface AiAgentContextType {
  isOpen: boolean;
  openAgent: () => void;
  closeAgent: () => void;
  toggleAgent: () => void;
}

const AiAgentContext = createContext<AiAgentContextType | undefined>(undefined);

export function AiAgentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAgent = useCallback(() => setIsOpen(true), []);
  const closeAgent = useCallback(() => setIsOpen(false), []);
  const toggleAgent = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ isOpen, openAgent, closeAgent, toggleAgent }),
    [isOpen, openAgent, closeAgent, toggleAgent],
  );

  return <AiAgentContext.Provider value={value}>{children}</AiAgentContext.Provider>;
}

export function useAiAgent() {
  const context = useContext(AiAgentContext);
  if (!context) throw new Error("useAiAgent must be used within an AiAgentProvider");
  return context;
}

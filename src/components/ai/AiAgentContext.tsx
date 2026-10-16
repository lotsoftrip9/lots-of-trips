"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AiAgentContextType {
  isOpen: boolean;
  openAgent: () => void;
  closeAgent: () => void;
  toggleAgent: () => void;
}

const AiAgentContext = createContext<AiAgentContextType | undefined>(undefined);

export function AiAgentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAgent = () => setIsOpen(true);
  const closeAgent = () => setIsOpen(false);
  const toggleAgent = () => setIsOpen((prev) => !prev);

  return (
    <AiAgentContext.Provider value={{ isOpen, openAgent, closeAgent, toggleAgent }}>
      {children}
    </AiAgentContext.Provider>
  );
}

export function useAiAgent() {
  const context = useContext(AiAgentContext);
  if (!context) {
    throw new Error("useAiAgent must be used within an AiAgentProvider");
  }
  return context;
}


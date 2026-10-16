"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  User,
  Loader2,
  ArrowRight,
  RotateCcw,
  MapPin,
  Compass,
} from "lucide-react";
import { useAiAgent } from "./AiAgentContext";
import { FormattedMessage } from "./FormattedMessage";
import { TripzyAvatar } from "./TripzyAvatar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { label: "4-Day Manali & Kasol", icon: "🏔️", prompt: "Plan a detailed 4-day scenic trip to Manali & Kasol with cafe spots and scenic drives." },
  { label: "Rishikesh Rafting Season", icon: "🚣", prompt: "When is the best time for river rafting in Rishikesh, and how should I plan a 2-day weekend trip?" },
  { label: "Quiet Offbeat Villages", icon: "🌲", prompt: "Recommend quiet offbeat mountain villages in Himachal Pradesh away from commercial crowds." },
  { label: "Nainital & Jim Corbett", icon: "🐅", prompt: "Create a 3-day family itinerary for Nainital lake tours and Jim Corbett jungle safari." },
];

const INITIAL_GREETING: Message = {
  role: "assistant",
  content:
    "Namaste from the Himalayas! 🏔️✨ I'm **Tripzy**, senior travel specialist at *Lots of Trips*.\n\nTell me: **Where in Himachal or Uttarakhand are you planning to go**, your group size, and ideal duration? I'll design a curated mountain itinerary for you and connect you directly with our operations team on WhatsApp for verified vehicle & hotel rates! 🚗🎒",
};

export function AiAgentDrawer() {
  const { isOpen, closeAgent } = useAiAgent();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, isOpen]);

  const resetChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input.trim();
    if (!textToSend || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-8),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate response.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch (err: unknown) {
      const error = err as Error;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${error.message || "Something went wrong while connecting. Please try again."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 md:p-6">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAgent}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Premium Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[32px] sm:rounded-[32px] bg-white dark:bg-zinc-950 shadow-2xl shadow-black/30 border border-slate-200/80 dark:border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-zinc-800/80 bg-linear-to-r from-emerald-50/70 via-white to-amber-50/40 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <TripzyAvatar size={44} withPulse />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-[16px] tracking-tight">
                      Tripzy
                    </h3>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-400">
                      AI Trip Guide
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3 text-emerald-600" />
                    Lots of Trips · Himachal & Uttarakhand
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {messages.length > 2 && (
                  <button
                    type="button"
                    onClick={resetChat}
                    title="Start fresh conversation"
                    className="grid size-9 place-items-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeAgent}
                  aria-label="Close"
                  className="grid size-9 place-items-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 sm:px-6 bg-slate-50/50 dark:bg-zinc-950">
              {messages.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar Icon */}
                    {isUser ? (
                      <div className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold shadow-xs">
                        <User className="size-4" />
                      </div>
                    ) : (
                      <TripzyAvatar size={32} />
                    )}

                    {/* Chat Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4.5 py-3.5 shadow-xs transition-all ${
                        isUser
                          ? "bg-emerald-600 text-white rounded-tr-xs"
                          : "bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 text-slate-800 dark:text-zinc-100 rounded-tl-xs shadow-slate-200/50 dark:shadow-none"
                      }`}
                    >
                      <FormattedMessage content={msg.content} isUser={isUser} />
                    </div>
                  </div>
                );
              })}

              {/* Typing / Loading indicator */}
              {loading && (
                <div className="flex items-start gap-2.5">
                  <TripzyAvatar size={32} />
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-xs bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 px-4 py-3 text-xs text-slate-500 shadow-xs">
                    <Loader2 className="size-3.5 animate-spin text-emerald-600" />
                    <span>Tripzy is crafting your itinerary...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts (Initial State) */}
            {messages.length <= 2 && (
              <div className="px-5 py-3 border-t border-slate-100 dark:border-zinc-800/70 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xs">
                <p className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="size-3.5 text-emerald-600" />
                  Popular Himalayan Trips:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {QUICK_PROMPTS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSend(item.prompt)}
                      className="group flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60 px-3 py-2 text-left text-[12.5px] text-slate-700 dark:text-zinc-200 border border-slate-200/60 dark:border-zinc-700/60 hover:border-emerald-500/80 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 hover:text-emerald-800 dark:hover:text-emerald-300 transition-all cursor-pointer"
                    >
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="font-medium truncate">{item.label}</span>
                      <ArrowRight className="size-3 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Direct WhatsApp Quote & Booking Banner */}
            <div className="px-5 py-2.5 bg-emerald-50/70 dark:bg-emerald-950/30 border-t border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-emerald-900 dark:text-emerald-300">
                <span className="size-2 rounded-full bg-[#25d366] shrink-0 animate-pulse" />
                Want exact pricing & cab rates?
              </span>
              <a
                href="https://wa.me/917015248493?text=Hi%20Lots%20of%20Trips!%20Tripzy%20helped%20me%20plan%20a%20mountain%20trip.%20Could%20you%20please%20share%20the%20package%20pricing%20and%20stay%20options%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-800 dark:text-emerald-200 hover:text-emerald-950 flex items-center gap-1 bg-white dark:bg-emerald-900/60 px-2.5 py-1 rounded-full shadow-xs border border-emerald-200 dark:border-emerald-700/60"
              >
                Chat on WhatsApp <ArrowRight className="size-3 text-emerald-600" />
              </a>
            </div>

            {/* Chat Input Box */}
            <div className="p-3.5 border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Tripzy about destinations, routes, packing..."
                    disabled={loading}
                    className="w-full rounded-full bg-slate-100/90 dark:bg-zinc-900 px-5 py-3 text-[14px] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none ring-1 ring-slate-200 dark:ring-zinc-800 focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-zinc-900 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-600 text-white transition-all disabled:opacity-30 disabled:scale-95 hover:bg-emerald-700 active:scale-95 cursor-pointer shadow-md shadow-emerald-600/25"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

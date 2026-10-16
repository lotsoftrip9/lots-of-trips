"use client";

import { ArrowUp, Square } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { tripzyCopy } from "@/content/tripzy";

interface ChatComposerProps {
  isStreaming: boolean;
  autoFocus: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
}

export function ChatComposer({ isStreaming, autoFocus, onSend, onStop }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (isStreaming || !value.trim()) return;
    onSend(value);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) submit(event);
  };

  return (
    <form onSubmit={submit} className="px-3 pt-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:px-4 sm:pb-2">
      <div className="flex items-end gap-2 rounded-3xl border border-line bg-surface p-1.5 pl-4 transition-colors focus-within:border-accent">
        <label htmlFor="tripzy-input" className="sr-only">
          Message Tripzy
        </label>
        <textarea
          id="tripzy-input"
          ref={inputRef}
          rows={1}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={tripzyCopy.placeholder}
          maxLength={2000}
          className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-base text-ink outline-none placeholder:text-slate sm:text-[15px]"
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop reply"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-snow cursor-pointer"
          >
            <Square className="size-3.5 fill-current" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!value.trim()}
            aria-label="Send message"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-snow transition-opacity disabled:opacity-25 cursor-pointer disabled:cursor-default"
          >
            <ArrowUp className="size-4.5" />
          </button>
        )}
      </div>
      <p className="mt-1.5 text-center text-[11px] text-slate">{tripzyCopy.disclaimer}</p>
    </form>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

interface EmbeddedFormProps {
  src: string;
  title: string;
  eager?: boolean;
  className?: string;
}

export function EmbeddedForm({ src, title, eager = false, className }: EmbeddedFormProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.data?.type !== "da-forms:height") return;
      if (!ref.current || event.source !== ref.current.contentWindow) return;
      ref.current.style.height = `${event.data.height}px`;
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      scrolling="no"
      loading={eager ? "eager" : "lazy"}
      className={cn("h-[630px] w-full overflow-hidden rounded-2xl border-none", className)}
    />
  );
}

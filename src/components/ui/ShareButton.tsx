"use client";

import { Check, Share2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { buttonClassName } from "@/components/ui/ButtonLink";

interface ShareButtonProps {
  title: string;
  text: string;
  icon?: ReactNode;
  label?: string;
}

export function ShareButton({ title, text, icon, label = "Share this destination" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={buttonClassName("outline", "w-full")}
    >
      {copied ? <Check className="size-4 text-[#4caf50]" /> : (icon ?? <Share2 className="size-4" />)}
      {copied ? "Link copied!" : label}
    </button>
  );
}


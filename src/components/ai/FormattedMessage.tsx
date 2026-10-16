"use client";

import React from "react";

interface FormattedMessageProps {
  content: string;
  isUser?: boolean;
}

export function FormattedMessage({ content, isUser = false }: FormattedMessageProps) {
  if (isUser) {
    return <span className="whitespace-pre-wrap leading-relaxed">{content}</span>;
  }

  // Parse sections and lines
  const lines = content.split("\n");

  return (
    <div className="space-y-2.5 text-[14px] leading-relaxed text-slate-800 dark:text-zinc-100">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();

        if (!line) {
          return <div key={idx} className="h-1" />;
        }

        // Heading 3 or 2 (### or ##)
        if (line.startsWith("### ") || line.startsWith("## ")) {
          const text = line.replace(/^#{2,3}\s+/, "");
          return (
            <div
              key={idx}
              className="mt-3.5 mb-1.5 pt-2 border-t border-slate-200/70 dark:border-zinc-800 first:border-none first:pt-0"
            >
              <h4 className="text-[14.5px] font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                {renderInlineStyles(text)}
              </h4>
            </div>
          );
        }

        // Heading 4 or 1 (# or ####)
        if (line.startsWith("# ") || line.startsWith("#### ")) {
          const text = line.replace(/^#{1,4}\s+/, "");
          return (
            <h5
              key={idx}
              className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
            >
              {renderInlineStyles(text)}
            </h5>
          );
        }

        // Bullet point (* or -)
        if (/^[-*•]\s+/.test(line)) {
          const text = line.replace(/^[-*•]\s+/, "");
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1.5 py-0.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500 shadow-xs" />
              <div className="flex-1 text-[13.5px] leading-normal">{renderInlineStyles(text)}</div>
            </div>
          );
        }

        // Numbered list item (1., 2., etc.)
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
        if (numberedMatch) {
          const num = numberedMatch[1];
          const text = numberedMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1 py-0.5">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold mt-0.5">
                {num}
              </span>
              <div className="flex-1 text-[13.5px] leading-normal">{renderInlineStyles(text)}</div>
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={idx} className="text-[13.5px]">
            {renderInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineStyles(text: string): React.ReactNode {
  // Split by bold (**bold**) and code (`code`)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-white">
          {boldText}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={i}
          className="rounded bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[12px] text-emerald-600 dark:text-emerald-400"
        >
          {codeText}
        </code>
      );
    }
    return part;
  });
}

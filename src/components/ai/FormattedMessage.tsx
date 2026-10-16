import Link from "next/link";
import type { ReactNode } from "react";

interface FormattedMessageProps {
  content: string;
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

function renderLink(label: string, href: string, key: number) {
  const className = "font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link key={key} href={href} className={className}>
        {label}
      </Link>
    );
  }
  if (href.startsWith("https://wa.me/")) {
    return (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return label;
}

function renderInline(text: string): ReactNode {
  return text.split(INLINE_PATTERN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(LINK_PATTERN);
    if (link) return renderLink(link[1], link[2], i);
    return part;
  });
}

export function FormattedMessage({ content }: FormattedMessageProps) {
  return (
    <div className="space-y-2">
      {content.split("\n").map((raw, idx) => {
        const line = raw.trim();
        if (!line) return null;

        const heading = line.match(/^#{1,4}\s+(.*)/);
        if (heading) {
          return (
            <p key={idx} className="pt-1 font-semibold tracking-tight text-ink">
              {renderInline(heading[1])}
            </p>
          );
        }

        const bullet = line.match(/^[-*•]\s+(.*)/);
        if (bullet) {
          return (
            <div key={idx} className="flex gap-2.5">
              <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent" aria-hidden />
              <p className="flex-1">{renderInline(bullet[1])}</p>
            </div>
          );
        }

        const numbered = line.match(/^(\d+)\.\s+(.*)/);
        if (numbered) {
          return (
            <div key={idx} className="flex gap-2.5">
              <span className="w-4 shrink-0 text-right text-[13px] font-semibold text-accent tabular-nums">
                {numbered[1]}
              </span>
              <p className="flex-1">{renderInline(numbered[2])}</p>
            </div>
          );
        }

        return <p key={idx}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

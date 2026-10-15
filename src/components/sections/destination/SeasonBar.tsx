"use client";

import { Bell } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils/cn";
import { MONTHS, monthShort } from "@/lib/utils/format";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";

export function SeasonBar({ months, name }: { months: number[]; name: string }) {
  const mounted = useMounted();
  const currentMonth = mounted ? new Date().getMonth() + 1 : null;
  const isInSeason = currentMonth ? months.includes(currentMonth) : true;

  const notifyLink = buildWhatsAppMessageLink(
    `Hi Lots of Trip! I'd like to visit ${name} — can you let me know the best upcoming dates and when the season opens?`,
  );

  return (
    <section className="container-x pb-section">
      <Reveal className="rounded-xl bg-paper p-7 md:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-saffron">When to go</p>
            <h2 className="mt-2 text-display-md">Best months for {name}</h2>
          </div>
          <p className="flex items-center gap-4 text-[13px] text-slate">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-accent" /> Ideal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-glacier" /> Off season
            </span>
          </p>
        </div>
        <ol className="mt-8 grid grid-cols-6 gap-2 md:grid-cols-12">
          {MONTHS.map((month, index) => {
            const active = months.includes(index + 1);
            const isCurrent = index + 1 === currentMonth;
            return (
              <li key={month} className="text-center">
                <span
                  aria-label={`${month}: ${active ? "ideal" : "off season"}`}
                  className={cn(
                    "block h-2 rounded-full",
                    active ? "bg-accent" : "bg-glacier",
                    isCurrent && "ring-2 ring-offset-1 ring-ink/30",
                  )}
                />
                <span
                  className={cn(
                    "mt-2 block text-[12px]",
                    active ? "font-semibold text-ink" : "text-slate",
                    isCurrent && "underline underline-offset-2",
                  )}
                >
                  {monthShort(index + 1)}
                </span>
              </li>
            );
          })}
        </ol>
        {!isInSeason && (
          <div className="mt-8 flex flex-col items-start gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-slate">
              {name} is currently off-season — ask us about the best upcoming dates.
            </p>
            <ButtonLink
              href={notifyLink}
              external
              variant="outline"
              icon={<Bell className="size-4" />}
            >
              Notify me when season opens
            </ButtonLink>
          </div>
        )}
      </Reveal>
    </section>
  );
}

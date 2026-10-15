"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { tripTypeLabel } from "@/lib/utils/format";
import type { Destination, StateSlug, TripType } from "@/types/destination";
import type { CurrentWeather } from "@/types/weather";

type StateFilter = StateSlug | "all";

const STATE_FILTERS: { value: StateFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "himachal", label: "Himachal" },
];

interface DestinationExplorerProps {
  destinations: Destination[];
  weather: Record<string, CurrentWeather | null>;
}

export function DestinationExplorer({ destinations, weather }: DestinationExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const types = Array.from(new Set(destinations.flatMap((item) => item.types)));

  const state = (searchParams.get("state") as StateFilter | null) ?? "all";
  const type = (searchParams.get("type") as TripType | null) ?? null;

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const results = destinations.filter(
    (item) => (state === "all" || item.state === state) && (!type || item.types.includes(type)),
  );

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div role="tablist" aria-label="State" className="inline-flex rounded-full bg-paper p-1">
          {STATE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={state === filter.value}
              onClick={() => setParam("state", filter.value)}
              className={cn(
                "relative rounded-full px-5 py-2 text-[14px] font-medium transition-colors",
                state === filter.value ? "text-ink" : "text-slate hover:text-ink",
              )}
            >
              {state === filter.value && (
                <motion.span
                  layoutId="state-filter"
                  transition={{ duration: 0.4, ease: CUBIC.outExpo }}
                  className="absolute inset-0 rounded-full bg-surface shadow-sm"
                />
              )}
              <span className="relative">{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {types.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={type === value}
              onClick={() => setParam("type", type === value ? null : value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-inset transition-colors",
                type === value ? "bg-ink text-snow ring-ink" : "text-slate ring-line hover:text-ink",
              )}
            >
              {tripTypeLabel(value)}
            </button>
          ))}
        </div>

        <p className="text-[14px] text-slate">
          {results.length} {results.length === 1 ? "destination" : "destinations"}
        </p>
      </div>

      <motion.ul layout className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((destination) => (
            <motion.li
              key={destination.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: CUBIC.outExpo }}
            >
              <DestinationCard
                destination={destination}
                weather={weather[destination.slug]}
                aspect="landscape"
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

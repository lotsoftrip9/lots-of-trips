"use client";

import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import { DestinationList } from "./DestinationList";
import { FinderField } from "./FinderField";
import { MonthGrid } from "./MonthGrid";
import { TravellerCounter } from "./TravellerCounter";
import { buildTripMessage, formatTravellers } from "./tripMessage";
import type { FinderDestination, FinderFieldId, Travellers } from "./types";

export function TripFinder({ destinations }: { destinations: FinderDestination[] }) {
  const [openField, setOpenField] = useState<FinderFieldId | null>(null);
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState<Travellers>({ adults: 2, children: 0 });

  const selected = destinations.find((item) => item.slug === destination);
  const message = buildTripMessage(selected?.name ?? "Uttarakhand or Himachal", month, travellers);

  const fieldProps = (id: FinderFieldId) => ({
    id: `trip-finder-${id}`,
    open: openField === id,
    onOpenChange: (open: boolean) => setOpenField(open ? id : null),
  });

  return (
    <div className="flex flex-col divide-y divide-white/15 rounded-xl bg-black/25 p-1.5 ring-1 ring-white/20 backdrop-blur-xl md:flex-row md:items-center md:divide-x md:divide-y-0 md:rounded-full">
      <FinderField {...fieldProps("destination")} label="Destination" value={selected?.name ?? "Anywhere in the hills"} Icon={MapPin}>
        <DestinationList
          destinations={destinations}
          value={destination}
          onSelect={(slug) => {
            setDestination(slug);
            setOpenField(null);
          }}
        />
      </FinderField>

      <FinderField {...fieldProps("month")} label="When" value={month || "Flexible"} Icon={CalendarDays}>
        <MonthGrid
          value={month}
          onSelect={(value) => {
            setMonth(value);
            setOpenField(null);
          }}
        />
      </FinderField>

      <FinderField {...fieldProps("travellers")} label="Travellers" value={formatTravellers(travellers)} Icon={Users}>
        <TravellerCounter value={travellers} onChange={setTravellers} onDone={() => setOpenField(null)} />
      </FinderField>

      <a
        href={buildWhatsAppMessageLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="group m-1.5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[12px] font-medium tracking-[0.16em] text-[#1c1b19] uppercase transition-colors duration-300 hover:bg-[#f0d3a0] md:m-0 md:h-13"
      >
        Plan my trip
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>
  );
}

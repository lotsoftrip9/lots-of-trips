"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MonthGrid } from "@/components/sections/home/trip-finder/MonthGrid";
import { TravellerCounter } from "@/components/sections/home/trip-finder/TravellerCounter";
import type { Travellers } from "@/components/sections/home/trip-finder/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { hotelStyles, quoteBuilderCopy } from "@/content/quoteBuilder";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import { HotelStylePicker } from "./HotelStylePicker";
import { QuoteField } from "./QuoteField";
import { buildQuoteMessage, summariseQuote } from "./quoteMessage";

interface TourQuoteBuilderProps {
  tourTitle: string;
  durationDays: number;
  bestMonths: number[];
}

const DEFAULT_HOTEL = hotelStyles[1];

export function TourQuoteBuilder({ tourTitle, durationDays, bestMonths }: TourQuoteBuilderProps) {
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState<Travellers>({ adults: 2, children: 0 });
  const [hotelId, setHotelId] = useState(DEFAULT_HOTEL.id);

  const hotel = hotelStyles.find((style) => style.id === hotelId) ?? DEFAULT_HOTEL;
  const message = buildQuoteMessage({ tourTitle, durationDays, month, travellers, hotel });

  return (
    <div className="rounded-xl bg-surface p-5 ring-1 ring-line ring-inset sm:p-7">
      <h3 className="text-[1.2rem] font-medium tracking-[-0.015em]">{quoteBuilderCopy.title}</h3>
      <p className="mt-1.5 text-[14px] text-slate">{quoteBuilderCopy.description}</p>

      <div className="mt-6 space-y-6">
        <QuoteField
          label={quoteBuilderCopy.monthLabel}
          aside={
            <span className="inline-flex items-center gap-1.5 text-[12px] text-slate">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {quoteBuilderCopy.bestSeason}
            </span>
          }
        >
          <MonthGrid
            value={month}
            onSelect={setMonth}
            highlight={bestMonths}
            className="p-0 md:w-auto"
            gridClassName="grid-cols-4 sm:grid-cols-6 md:grid-cols-6"
          />
        </QuoteField>

        <QuoteField label={quoteBuilderCopy.travellersLabel}>
          <TravellerCounter value={travellers} onChange={setTravellers} className="-my-3 p-0 md:w-auto" />
        </QuoteField>

        <QuoteField label={quoteBuilderCopy.hotelLabel}>
          <HotelStylePicker
            styles={hotelStyles}
            value={hotelId}
            label={quoteBuilderCopy.hotelLabel}
            onChange={setHotelId}
          />
        </QuoteField>
      </div>

      <div className="mt-7 border-t border-line pt-5">
        <p className="text-[13px] text-slate" aria-live="polite">
          {summariseQuote({ month, travellers, hotel })}
        </p>
        <ButtonLink
          href={buildWhatsAppMessageLink(message)}
          external
          icon={<FaWhatsapp className="size-4 text-[#25d366]" />}
          className="mt-4 w-full"
        >
          {quoteBuilderCopy.cta}
        </ButtonLink>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { formatTravellers } from "@/components/sections/home/trip-finder/tripMessage";
import type { Travellers } from "@/components/sections/home/trip-finder/types";
import { hotelStyles, quoteBuilderCopy } from "@/content/quoteBuilder";
import { cn } from "@/lib/utils/cn";
import { buildWhatsAppMessageLink } from "@/lib/utils/whatsapp";
import type { ImageAsset } from "@/types/image";
import { ItineraryDownload } from "../ItineraryDownload";
import { HotelStylePicker } from "./HotelStylePicker";
import { MonthChips } from "./MonthChips";
import { PlannerStep } from "./PlannerStep";
import { buildQuoteMessage } from "./quoteMessage";
import { TravellerTiles } from "./TravellerTiles";
import { TripSummaryCard } from "./TripSummaryCard";

interface TourPlannerProps {
  slug: string;
  title: string;
  durationDays: number;
  bestMonths: number[];
  places: string[];
  cover: ImageAsset;
}

const DEFAULT_HOTEL = hotelStyles[1];
const { steps, summary } = quoteBuilderCopy;

export function TourPlanner({ slug, title, durationDays, bestMonths, places, cover }: TourPlannerProps) {
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState<Travellers>({ adults: 2, children: 0 });
  const [hotelId, setHotelId] = useState(DEFAULT_HOTEL.id);

  const hotel = hotelStyles.find((style) => style.id === hotelId) ?? DEFAULT_HOTEL;
  const whatsappHref = buildWhatsAppMessageLink(buildQuoteMessage({ tourTitle: title, durationDays, month, travellers, hotel }));
  const flexible = month === "";

  return (
    <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-10">
      <div className="space-y-4 lg:col-span-7">
        <PlannerStep
          index={0}
          title={steps.month}
          aside={
            <button
              type="button"
              aria-pressed={flexible}
              onClick={() => setMonth("")}
              className={cn(
                "h-8 rounded-full px-3.5 text-[12.5px] font-medium ring-1 transition-colors duration-300 ring-inset",
                flexible ? "bg-ink text-snow ring-ink" : "text-slate ring-line hover:text-ink",
              )}
            >
              {quoteBuilderCopy.flexible}
            </button>
          }
        >
          <MonthChips value={month} bestMonths={bestMonths} bestSeasonLabel={quoteBuilderCopy.bestSeason} onChange={setMonth} />
        </PlannerStep>

        <PlannerStep index={1} title={steps.travellers}>
          <TravellerTiles value={travellers} onChange={setTravellers} />
        </PlannerStep>

        <PlannerStep index={2} title={steps.hotel}>
          <HotelStylePicker styles={hotelStyles} value={hotelId} label={steps.hotel} onChange={setHotelId} />
        </PlannerStep>
      </div>

      <div className="space-y-4 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        <TripSummaryCard
          title={title}
          subtitle={`${places.join(" · ")} · ${durationDays} days`}
          cover={cover}
          whatsappHref={whatsappHref}
          rows={[
            { label: summary.month, value: month || quoteBuilderCopy.flexibleValue },
            { label: summary.travellers, value: formatTravellers(travellers) },
            { label: summary.hotel, value: hotel.label },
          ]}
        />
        <ItineraryDownload slug={slug} title={title} />
      </div>
    </div>
  );
}

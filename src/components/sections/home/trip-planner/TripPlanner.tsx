"use client";

import { BedDouble, CalendarDays, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { DestinationList } from "@/components/sections/home/trip-finder/DestinationList";
import { MonthGrid } from "@/components/sections/home/trip-finder/MonthGrid";
import { TravellerCounter } from "@/components/sections/home/trip-finder/TravellerCounter";
import { formatTravellers } from "@/components/sections/home/trip-finder/tripMessage";
import type { FinderDestination, Travellers } from "@/components/sections/home/trip-finder/types";
import { hotelStyles, tripPlannerCopy as copy } from "@/content/quoteBuilder";
import { HotelChoiceList } from "./HotelChoiceList";
import { MessagePreview } from "./MessagePreview";
import { PlannerField } from "./PlannerField";
import { buildPlannerMessage } from "./plannerMessage";

type FieldId = "destination" | "month" | "travellers" | "hotel";

const DEFAULT_HOTEL = hotelStyles[1];

export function TripPlanner({ destinations }: { destinations: FinderDestination[] }) {
  const [openField, setOpenField] = useState<FieldId | null>(null);
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState<Travellers>({ adults: 2, children: 0 });
  const [hotelId, setHotelId] = useState(DEFAULT_HOTEL.id);

  const selected = destinations.find((item) => item.slug === destination);
  const hotel = hotelStyles.find((style) => style.id === hotelId) ?? DEFAULT_HOTEL;
  const message = buildPlannerMessage({
    place: selected?.name ?? "Uttarakhand or Himachal",
    month,
    travellers,
    hotel,
  });

  const fieldProps = (id: FieldId) => ({
    id: `trip-planner-${id}`,
    open: openField === id,
    onOpenChange: (open: boolean) => setOpenField(open ? id : null),
  });

  const choose = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setOpenField(null);
  };

  return (
    <section className="container-x pb-section">
      <div className="grid gap-8 rounded-xl bg-paper p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <Reveal className="lg:col-span-7 lg:py-4">
          <p className="eyebrow text-saffron">{copy.eyebrow}</p>
          <h2 className="mt-3 text-display-md">
            {copy.title} <em>{copy.emphasis}</em>
          </h2>
          <p className="mt-4 max-w-xl text-slate">{copy.intro}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <PlannerField {...fieldProps("destination")} label={copy.fields.destination} value={selected?.name ?? copy.anywhere} Icon={MapPin}>
              <DestinationList destinations={destinations} value={destination} onSelect={choose(setDestination)} />
            </PlannerField>
            <PlannerField {...fieldProps("month")} label={copy.fields.month} value={month || copy.flexibleMonth} Icon={CalendarDays}>
              <MonthGrid value={month} onSelect={choose(setMonth)} />
            </PlannerField>
            <PlannerField {...fieldProps("travellers")} label={copy.fields.travellers} value={formatTravellers(travellers)} Icon={Users}>
              <TravellerCounter value={travellers} onChange={setTravellers} onDone={() => setOpenField(null)} />
            </PlannerField>
            <PlannerField {...fieldProps("hotel")} label={copy.fields.hotel} value={hotel.label} Icon={BedDouble}>
              <HotelChoiceList styles={hotelStyles} value={hotelId} onSelect={choose(setHotelId)} />
            </PlannerField>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <MessagePreview message={message} />
        </Reveal>
      </div>
    </section>
  );
}

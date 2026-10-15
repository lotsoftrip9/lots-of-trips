import { Check, X } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

interface TourInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function TourInclusions({ inclusions, exclusions }: TourInclusionsProps) {
  const lists = [
    { title: "What's included", items: inclusions, Icon: Check, iconClass: "text-[#28a745]" },
    { title: "Not included", items: exclusions, Icon: X, iconClass: "text-slate" },
  ];

  return (
    <section className="container-x pb-section">
      <Reveal stagger className="grid gap-5 md:grid-cols-2">
        {lists.map(({ title, items, Icon, iconClass }) => (
          <RevealItem key={title} className="rounded-xl bg-paper p-7 md:p-8">
            <h3 className="text-xl tracking-tight">{title}</h3>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px]">
                  <Icon className={cn("mt-0.5 size-4 shrink-0", iconClass)} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

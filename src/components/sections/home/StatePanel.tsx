import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Chevron } from "@/components/ui/ButtonLink";
import type { StateInfo } from "@/types/destination";
import type { ImageAsset } from "@/types/image";

export interface StatePanelData extends StateInfo {
  image: ImageAsset;
}

export function StatePanel({ panel }: { panel: StatePanelData }) {
  return (
    <Link
      href={`/journeys/${panel.slug}`}
      className="group block overflow-hidden rounded-xl bg-surface shadow-[0_2px_12px_rgb(0_0_0/0.04)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgb(0_0_0/0.1)]"
    >
      <div className="px-8 pt-9 text-center md:px-10 md:pt-11">
        <p className="eyebrow text-slate">{panel.epithet}</p>
        <h3 className="mt-2 text-display-md">{panel.name}</h3>
        <p className="mx-auto mt-3 max-w-md text-slate">{panel.intro}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
          Explore {panel.slug === "himachal" ? "Himachal" : panel.name}
          <Chevron />
        </span>
      </div>

      <dl className="mx-8 mt-8 grid grid-cols-3 divide-x divide-line border-y border-line py-4 text-center md:mx-10">
        {panel.stats.map((stat) => (
          <div key={stat.label} className="px-2">
            <dd className="text-[15px] font-semibold">{stat.value}</dd>
            <dt className="mt-0.5 text-[12px] text-slate">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="relative mt-8 aspect-4/3 overflow-hidden">
        <AppImage
          image={panel.image}
          sizes="(min-width: 768px) 46vw, 100vw"
          className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
    </Link>
  );
}

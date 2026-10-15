import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pluralize } from "@/lib/utils/format";
import type { ImageAsset } from "@/types/image";

export interface ExperienceItem {
  type: string;
  label: string;
  description: string;
  count: number;
  image: ImageAsset;
}

export function ExperienceGrid({ items }: { items: ExperienceItem[] }) {
  return (
    <section className="container-x py-section">
      <SectionIntro
        align="center"
        label="Ways to travel"
        title={
          <>
            Choose how you want to <em>feel</em> up there.
          </>
        }
      />
      <Reveal stagger className="mt-14 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <RevealItem key={item.type}>
            <Link href={`/destinations?type=${item.type}`} className="group block">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-paper sm:aspect-3/2">
                <AppImage
                  image={item.image}
                  sizes="(min-width: 1024px) 26rem, 50vw"
                  className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-3 flex flex-col gap-0.5 px-1 sm:mt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-[17px] tracking-tight sm:text-xl">{item.label}</h3>
                <span className="text-[12px] text-slate sm:text-[13px]">{pluralize(item.count, "place")}</span>
              </div>
              <p className="mt-1 line-clamp-2 px-1 text-[13px] text-slate sm:text-[15px]">{item.description}</p>
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

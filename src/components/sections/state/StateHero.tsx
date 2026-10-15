import { Reveal } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import type { StateInfo } from "@/types/destination";
import type { ImageAsset } from "@/types/image";

export function StateHero({ state, image }: { state: StateInfo; image: ImageAsset }) {
  return (
    <section className="container-x pt-14 md:pt-20">
      <Reveal onLoad className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-saffron">{state.epithet}</p>
        <h1 className="mt-3 text-display-xl">{state.name}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lead text-slate">{state.description}</p>
      </Reveal>

      <div className="relative mt-12 aspect-4/3 overflow-hidden rounded-xl bg-paper sm:aspect-16/9 md:mt-16 lg:aspect-21/9">
        <AppImage image={image} sizes="(min-width: 1312px) 1216px, 100vw" preload />
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-line">
        {state.stats.map((stat) => (
          <div key={stat.label} className="bg-paper px-5 py-5 text-center">
            <dd className="font-serif-display text-display-md">{stat.value}</dd>
            <dt className="mt-1 text-[13px] text-slate">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

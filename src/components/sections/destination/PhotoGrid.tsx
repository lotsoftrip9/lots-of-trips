import { Reveal } from "@/components/motion/Reveal";
import type { ImageAsset } from "@/types/image";
import { PhotoGallery } from "./PhotoGallery";

export function PhotoGrid({ images, title }: { images: ImageAsset[]; title: string }) {
  if (!images.length) return null;

  return (
    <section className="container-x pb-section">
      <Reveal className="flex items-end justify-between gap-6">
        <h2 className="text-display-md">{title}</h2>
        <p className="hidden shrink-0 text-[13px] text-slate sm:block">Open any photo full screen</p>
      </Reveal>
      <PhotoGallery images={images} />
    </section>
  );
}

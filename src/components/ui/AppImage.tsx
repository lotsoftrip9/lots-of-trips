import Image from "next/image";
import type { ImageAsset } from "@/types/image";
import { cn } from "@/lib/utils/cn";

const IMAGE_QUALITY = 90;

interface AppImageProps {
  image: ImageAsset;
  sizes: string;
  className?: string;
  preload?: boolean;
  alt?: string;
  quality?: number;
}

export function AppImage({ image, sizes, className, preload, alt, quality = IMAGE_QUALITY }: AppImageProps) {
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      quality={quality}
      preload={preload}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={cn("object-cover", className)}
    />
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox/Lightbox";
import type { GalleryPhoto } from "@/types/gallery";
import { GalleryGrid } from "./GalleryGrid";

interface GalleryExplorerProps {
  photos: GalleryPhoto[];
}

export function GalleryExplorer({ photos }: GalleryExplorerProps) {
  const searchParams = useSearchParams();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const location = searchParams.get("location") ?? "all";

  const results = location === "all" ? photos : photos.filter((photo) => photo.destinationSlug === location);
  const lightboxImages = results.map((photo) => photo.image);

  return (
    <div>
      <div className="mt-2">
        <GalleryGrid photos={results} onPhotoClick={setOpenIndex} />
      </div>

      <Lightbox images={lightboxImages} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </div>
  );
}

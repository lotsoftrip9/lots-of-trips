import type { GalleryPhoto } from "@/types/gallery";
import { getDestinations } from "./destinations";

export function getGalleryPhotos(): GalleryPhoto[] {
  return getDestinations().flatMap((destination) =>
    destination.images.map((image) => ({
      image,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      state: destination.state,
    })),
  );
}

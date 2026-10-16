import type { ImageAsset } from "./image";

export interface GalleryPhoto {
  image: ImageAsset;
  destinationSlug: string;
  destinationName: string;
  state: "uttarakhand" | "himachal";
}

import manifest from "@/content/generated/images.json";
import type { ImageAsset } from "@/types/image";
import type { ImageRef } from "@/types/tour";

type ManifestEntry = Omit<ImageAsset, "alt">;

const imageManifest = manifest as Record<string, ManifestEntry[]>;

const toAsset = (entry: ManifestEntry, placeName: string): ImageAsset => ({
  ...entry,
  alt: `${placeName} — ${entry.credit.title}`,
});

export function getImagesFor(destinationSlug: string, placeName: string): ImageAsset[] {
  return (imageManifest[destinationSlug] ?? []).map((entry) => toAsset(entry, placeName));
}

export function resolveImage(ref: ImageRef, placeName = ""): ImageAsset {
  const entries = imageManifest[ref.destination];
  if (!entries?.length) {
    throw new Error(`No images found for destination "${ref.destination}"`);
  }
  const entry = entries[ref.index] ?? entries[0];
  return toAsset(entry, placeName || ref.destination);
}

export function getAllCredits() {
  return Object.entries(imageManifest).flatMap(([destination, entries]) =>
    entries.map((entry) => ({ destination, src: entry.src, ...entry.credit })),
  );
}

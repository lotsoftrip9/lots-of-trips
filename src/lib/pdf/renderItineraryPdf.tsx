import { renderToBuffer } from "@react-pdf/renderer";
import type { Tour } from "@/types/tour";
import { ItineraryDocument } from "./ItineraryDocument";
import { loadPhotoAsJpeg, loadPng } from "./loadPdfImage";

export async function renderItineraryPdf(tour: Tour, places: string[], siteUrl: string) {
  const [cover, logo] = await Promise.all([loadPhotoAsJpeg(tour.cover.src), loadPng("/logo.png")]);
  return renderToBuffer(<ItineraryDocument tour={tour} places={places} cover={cover} logo={logo} siteUrl={siteUrl} />);
}

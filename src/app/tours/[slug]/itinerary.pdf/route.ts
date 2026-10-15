import { getDestination } from "@/lib/data/destinations";
import { getTour, getTours } from "@/lib/data/tours";
import { renderItineraryPdf } from "@/lib/pdf/renderItineraryPdf";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export function generateStaticParams() {
  return getTours().map((tour) => ({ slug: tour.slug }));
}

export async function GET(_request: Request, { params }: RouteContext<"/tours/[slug]/itinerary.pdf">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return new Response("Not found", { status: 404 });

  const places = tour.destinations.flatMap((destination) => getDestination(destination)?.name ?? []);
  const pdf = await renderItineraryPdf(tour, places, getSiteUrl());

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${slug}-itinerary.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

import { testimonials } from "@/content/testimonials";
import type { ResolvedTestimonial } from "@/types/site";
import { getTour } from "./tours";

export const getTestimonials = (): ResolvedTestimonial[] =>
  testimonials.flatMap((testimonial) => {
    const tour = getTour(testimonial.tourSlug);
    return tour ? [{ ...testimonial, tourTitle: tour.title, image: tour.cover }] : [];
  });

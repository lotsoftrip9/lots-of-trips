import { testimonials } from "@/content/testimonials";
import type { ResolvedTestimonial } from "@/types/site";
import { getTour } from "./tours";

export const getTestimonialForTour = (tourSlug: string) =>
  testimonials.find((testimonial) => testimonial.tourSlug === tourSlug) ?? testimonials[0];

export const getTestimonials = (): ResolvedTestimonial[] =>
  testimonials.flatMap((testimonial) => {
    const tour = getTour(testimonial.tourSlug);
    return tour ? [{ ...testimonial, tourTitle: tour.title, image: tour.cover }] : [];
  });

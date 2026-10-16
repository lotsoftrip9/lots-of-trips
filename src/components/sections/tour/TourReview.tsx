import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/types/site";

export function TourReview({ testimonial }: { testimonial: Testimonial }) {
  return (
    <section className="container-x pb-section">
      <Reveal>
        <figure className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto size-7 text-accent" aria-hidden />
          <blockquote className="mt-5 text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-medium tracking-tight text-ink">
            {testimonial.quote}
          </blockquote>
          <figcaption className="mt-6 text-[14px] text-slate">
            <span className="font-semibold text-ink">{testimonial.name}</span> · {testimonial.city} · {testimonial.party}
            <span className="block text-[13px]">Travelled {testimonial.travelled}</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

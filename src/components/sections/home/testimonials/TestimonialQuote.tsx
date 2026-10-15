"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { Fragment } from "react";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

const QUOTE_CLASS =
  "col-start-1 row-start-1 text-[1.3rem] leading-snug font-medium tracking-[-0.02em] text-balance sm:text-display-md";

const quoteVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.022 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.3em", filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: CUBIC.outExpo } },
};

interface TestimonialQuoteProps {
  quotes: string[];
  activeIndex: number;
}

export function TestimonialQuote({ quotes, activeIndex }: TestimonialQuoteProps) {
  return (
    <div className="grid">
      {quotes.map((quote) => (
        <p key={quote} aria-hidden className={cn(QUOTE_CLASS, "invisible")}>
          “{quote}”
        </p>
      ))}
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={activeIndex}
          variants={quoteVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={QUOTE_CLASS}
        >
          {`“${quotes[activeIndex]}”`.split(" ").map((word, index) => (
            <Fragment key={index}>
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>{" "}
            </Fragment>
          ))}
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}

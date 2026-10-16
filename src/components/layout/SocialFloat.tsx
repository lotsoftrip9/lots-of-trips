"use client";

import { motion } from "motion/react";
import type { ComponentType, SVGProps } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/content/site";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { useAiAgent } from "@/components/ai/AiAgentContext";
import { TripzyAvatar } from "@/components/ai/TripzyAvatar";

interface FloatLink {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  className: string;
}

const LINKS: FloatLink[] = [
  {
    href: siteConfig.social.instagram.url,
    label: "Follow on Instagram",
    Icon: FaInstagram,
    className: "bg-linear-45 from-[#feda75] via-[#d62976] to-[#4f5bd5]",
  },
  {
    href: buildWhatsAppLink(),
    label: "Chat on WhatsApp",
    Icon: FaWhatsapp,
    className: "bg-[#25d366] hover:bg-[#1ebe5a]",
  },
];

export function SocialFloat() {
  const { openAgent } = useAiAgent();

  return (
    <div className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 md:flex">
      <motion.button
        type="button"
        onClick={openAgent}
        aria-label="Plan with Tripzy"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: CUBIC.outExpo, delay: 0.7 }}
        className="group flex h-12 items-center rounded-full border border-line bg-surface p-1 shadow-lg shadow-black/15 cursor-pointer"
      >
        <TripzyAvatar size="lg" />
        <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap text-ink transition-[max-width,margin] duration-500 ease-out-expo group-hover:mx-3 group-hover:max-w-44">
          Plan with Tripzy
        </span>
      </motion.button>

      {LINKS.map(({ href, label, Icon, className }, index) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: CUBIC.outExpo, delay: 0.8 + index * 0.12 }}
          className={cn(
            "group flex h-11 items-center overflow-hidden rounded-full px-2.5 text-white shadow-lg shadow-black/25 transition-colors duration-300 sm:h-12 sm:px-3",
            className,
          )}
        >
          <Icon className="size-6 shrink-0" />
          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width,margin] duration-500 ease-out-expo group-hover:ml-2 group-hover:max-w-44">
            {label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

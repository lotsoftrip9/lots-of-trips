"use client";

import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { useAiAgent } from "@/components/ai/AiAgentContext";
import { TripzyAvatar } from "@/components/ai/TripzyAvatar";
import styles from "./MobileActionBar.module.css";

interface Action {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClass?: string;
  external?: boolean;
}

export function MobileActionBar() {
  const { openAgent } = useAiAgent();
  const { contact, social } = siteConfig;

  const actions: Action[] = [
    { label: "Call", href: `tel:${contact.phoneE164}`, Icon: Phone },
    { label: "WhatsApp", href: buildWhatsAppLink(), Icon: FaWhatsapp, iconClass: "text-[#25d366]", external: true },
    { label: "Instagram", href: social.instagram.url, Icon: FaInstagram, iconClass: "text-[#d62976]", external: true },
  ];

  return (
    <nav aria-label="Quick actions" className={styles.bar}>
      <div className="grid grid-cols-5 items-center gap-1 px-1.5 pt-2">
        {/* Call, WhatsApp, Instagram */}
        {actions.map(({ label, href, Icon, iconClass, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-medium text-ink-soft active:bg-paper"
          >
            <Icon className={cn("size-4.5", iconClass)} aria-hidden />
            {label}
          </a>
        ))}

        {/* AI Trip Assistant Button */}
        <button
          type="button"
          onClick={openAgent}
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 active:bg-paper cursor-pointer"
        >
          <TripzyAvatar size={20} className="border-0 shadow-none ring-1 ring-emerald-500/30" />
          Tripzy
        </button>

        {/* Plan a Trip CTA */}
        <Link
          href="/contact"
          className="flex flex-col items-center gap-1 rounded-xl bg-ink py-1 text-[10px] font-medium text-snow active:bg-ink-soft"
        >
          <CalendarCheck className="size-4.5" aria-hidden />
          Plan trip
        </Link>
      </div>
    </nav>
  );
}

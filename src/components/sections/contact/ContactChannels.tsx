import { Mail, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

interface Channel {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClass: string;
  title: string;
  body: string;
  value: string;
  href: string;
  external?: boolean;
}

export function ContactChannels() {
  const { contact, social } = siteConfig;
  const channels: Channel[] = [
    {
      Icon: FaWhatsapp,
      iconClass: "text-[#25d366]",
      title: "WhatsApp",
      body: "Fastest way to reach a trip designer.",
      value: contact.phoneDisplay,
      href: buildWhatsAppLink(),
      external: true,
    },
    {
      Icon: Phone,
      iconClass: "text-accent",
      title: "Call us",
      body: contact.hours,
      value: contact.phoneDisplay,
      href: `tel:${contact.phoneE164}`,
    },
    {
      Icon: Mail,
      iconClass: "text-accent",
      title: "Email",
      body: "For detailed itineraries and group quotes.",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      Icon: FaInstagram,
      iconClass: "text-[#e1306c]",
      title: "Instagram",
      body: "Trip photos, departures and DMs.",
      value: social.instagram.handle,
      href: social.instagram.url,
      external: true,
    },
  ];

  return (
    <Reveal stagger className="grid gap-4 sm:grid-cols-2">
      {channels.map(({ Icon, iconClass, title, body, value, href, external }) => (
        <RevealItem key={title}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group block h-full rounded-xl bg-paper p-6 transition-colors duration-300 hover:bg-glacier/40"
          >
            <Icon className={`size-5 ${iconClass}`} aria-hidden />
            <h3 className="mt-4 text-[15px] tracking-tight">{title}</h3>
            <p className="mt-1 text-[14px] text-slate">{body}</p>
            <p className="mt-3 text-[15px] font-medium text-accent group-hover:underline">{value}</p>
          </a>
        </RevealItem>
      ))}
    </Reveal>
  );
}

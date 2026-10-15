import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";

const MARK_CLASS = "size-full scale-[1.12] object-cover";

interface LogoProps {
  inheritColor?: boolean;
  className?: string;
}

export function Logo({ inheritColor = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2.5", !inheritColor && "text-ink", className)}
    >
      <span className="relative size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-current/15 sm:size-9">
        <Image
          src="/logo-light.png"
          alt=""
          width={36}
          height={36}
          sizes="36px"
          data-logo-mark="light"
          className={cn(MARK_CLASS, "dark:hidden")}
        />
        <Image
          src="/logo-dark.png"
          alt=""
          width={36}
          height={36}
          sizes="36px"
          data-logo-mark="dark"
          className={cn(MARK_CLASS, "hidden dark:block")}
        />
      </span>
      <span className="font-serif-display text-[1.3rem] leading-none tracking-[-0.02em] whitespace-nowrap sm:text-[1.6rem]">
        Lots <em className="italic">of</em> Trip
      </span>
    </Link>
  );
}

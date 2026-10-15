import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";

const MARK_CLASS = "h-10 w-auto sm:h-12";

interface LogoProps {
  inheritColor?: boolean;
  className?: string;
}

export function Logo({ inheritColor = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center", !inheritColor && "text-ink", className)}
    >
      <Image
        src="/logo.png"
        alt={siteConfig.name}
        width={1177}
        height={466}
        priority
        sizes="(min-width: 640px) 180px, 144px"
        data-logo-mark="light"
        className={cn(MARK_CLASS, "dark:hidden")}
      />
      <Image
        src="/logo-on-dark.png"
        alt=""
        width={1177}
        height={466}
        priority
        sizes="(min-width: 640px) 180px, 144px"
        data-logo-mark="dark"
        className={cn(MARK_CLASS, "hidden dark:block")}
      />
    </Link>
  );
}

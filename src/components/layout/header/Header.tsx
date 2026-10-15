"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/utils/cn";
import type { HeaderData } from "@/types/site";
import styles from "./Header.module.css";
import { MegaMenu } from "./MegaMenu";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";

export function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 48));

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const toggle = () => {
    setOpenedAt(pathname);
    setOpen((value) => !value);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={styles.header}
        data-solid={scrolled || open || undefined}
        data-scrolled={scrolled || undefined}
        data-menu-open={open || undefined}
      >
        <div className="container-x relative flex h-header items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <nav aria-label="Main" className="hidden items-center gap-1 self-stretch lg:flex">
            <MegaMenu data={data} label="Destinations" />
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Logo inheritColor />

          <div className="flex items-center justify-end gap-1 sm:gap-1.5">
            <ThemeToggle className={styles.iconButton} />
            <Link href="/contact" className={styles.cta}>
              Plan a trip
            </Link>
            <MenuToggle open={open} onToggle={toggle} />
          </div>
        </div>

        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </header>
      <div aria-hidden className={cn("h-header", styles.spacer)} />
    </>
  );
}

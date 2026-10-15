import Link from "next/link";
import type { NavItem } from "@/types/site";

export function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-[13px] font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[13px] text-slate transition-colors hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

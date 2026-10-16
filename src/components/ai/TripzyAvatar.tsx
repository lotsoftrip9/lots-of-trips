"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface TripzyAvatarProps {
  size?: number;
  className?: string;
  withPulse?: boolean;
}

export function TripzyAvatar({ size = 44, className, withPulse = false }: TripzyAvatarProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full aspect-square",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Light theme logo */}
      <Image
        src="/tripzy-light.png"
        alt="Tripzy AI"
        width={size * 2}
        height={size * 2}
        className="block dark:hidden size-full object-cover rounded-full"
        priority
      />

      {/* Dark theme logo */}
      <Image
        src="/tripzy-dark.png"
        alt="Tripzy AI"
        width={size * 2}
        height={size * 2}
        className="hidden dark:block size-full object-cover rounded-full"
        priority
      />

      {/* Active pulse dot if enabled */}
      {withPulse && (
        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950" />
      )}
    </div>
  );
}

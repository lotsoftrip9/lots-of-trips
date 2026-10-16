import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const SIZES = {
  sm: { className: "size-7", px: 28 },
  md: { className: "size-8", px: 32 },
  lg: { className: "size-10", px: 40 },
  xl: { className: "size-16", px: 64 },
} as const;

interface TripzyAvatarProps {
  size?: keyof typeof SIZES;
  bare?: boolean;
  className?: string;
}

export function TripzyAvatar({ size = "md", bare = false, className }: TripzyAvatarProps) {
  const { className: sizeClass, px } = SIZES[size];
  const imageClass = cn("size-full object-contain", !bare && "p-[12%]");

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden",
        !bare && "rounded-full bg-white ring-1 ring-line dark:bg-[#060b18]",
        sizeClass,
        className,
      )}
    >
      <Image
        src="/tripzy-mark-light.png"
        alt=""
        width={px * 2}
        height={px * 2}
        className={cn(imageClass, "dark:hidden")}
      />
      <Image
        src="/tripzy-mark-dark.png"
        alt=""
        width={px * 2}
        height={px * 2}
        className={cn(imageClass, "hidden dark:block")}
      />
    </span>
  );
}

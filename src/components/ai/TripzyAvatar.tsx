import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const SIZES = {
  sm: { className: "size-5", px: 20 },
  md: { className: "size-8", px: 32 },
  lg: { className: "size-10", px: 40 },
} as const;

interface TripzyAvatarProps {
  size?: keyof typeof SIZES;
  className?: string;
}

export function TripzyAvatar({ size = "md", className }: TripzyAvatarProps) {
  const { className: sizeClass, px } = SIZES[size];

  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-surface", sizeClass, className)}>
      <Image src="/tripzy-light.png" alt="" width={px * 2} height={px * 2} className="size-full object-cover dark:hidden" />
      <Image
        src="/tripzy-dark.png"
        alt=""
        width={px * 2}
        height={px * 2}
        className="hidden size-full object-cover dark:block"
      />
    </span>
  );
}

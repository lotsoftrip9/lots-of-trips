"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { useScrollLock } from "@/hooks/useScrollLock";
import { CUBIC } from "@/lib/motion/tokens";
import type { ImageAsset } from "@/types/image";
import { useSwipe } from "./useSwipe";

interface LightboxProps {
  images: ImageAsset[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

const NAV_BUTTON =
  "grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Lightbox({ images, index, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  useScrollLock(open);

  const step = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + images.length) % images.length);
  };
  const swipe = useSwipe({ onLeft: () => step(1), onRight: () => step(-1) });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  const image = index === null ? null : images[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#0b0a09] p-0 text-white backdrop:bg-black/90"
    >
      {image && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 pt-[calc(1rem+env(safe-area-inset-top))] md:px-8 md:pt-6">
            <p className="text-[12px] font-medium tracking-[0.18em] text-white/60 uppercase tabular-nums">
              {(index ?? 0) + 1} / {images.length}
            </p>
            <button type="button" onClick={onClose} aria-label="Close photo viewer" className={NAV_BUTTON}>
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex-1 touch-pan-y" {...swipe}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={image.src}
                className="absolute inset-4 md:inset-x-24 md:inset-y-6"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: CUBIC.outExpo }}
              >
                <AppImage image={image} sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className={`${NAV_BUTTON} absolute top-1/2 left-4 hidden -translate-y-1/2 md:grid`}
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className={`${NAV_BUTTON} absolute top-1/2 right-4 hidden -translate-y-1/2 md:grid`}
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
          </div>

          <div className="flex items-end justify-between gap-6 px-4 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:px-8 md:pb-8">
            <div className="min-w-0">
              <p className="text-[15px] text-white/90">{image.alt}</p>
              <p className="mt-1 truncate text-[12px] text-white/50">
                Photo by {image.credit.artist} · {image.credit.license}
              </p>
            </div>
            {images.length > 1 && (
              <div className="flex shrink-0 gap-2 md:hidden">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={NAV_BUTTON}>
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={NAV_BUTTON}>
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

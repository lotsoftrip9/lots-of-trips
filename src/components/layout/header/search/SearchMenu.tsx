"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";
import { useSearchShortcut } from "@/hooks/useSearchShortcut";
import type { SearchData } from "@/types/search";
import { SearchDialog } from "./SearchDialog";
import { SearchTrigger } from "./SearchTrigger";

interface SearchMenuProps {
  data: SearchData;
  onOpen?: () => void;
  className?: string;
}

export function SearchMenu({ data, onOpen, className }: SearchMenuProps) {
  const mounted = useMounted();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    onOpen?.();
    setOpen(true);
  }, [onOpen]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  useSearchShortcut(show);

  return (
    <>
      <SearchTrigger ref={triggerRef} open={open} onOpen={show} className={className} />
      {mounted &&
        createPortal(
          <AnimatePresence>{open && <SearchDialog data={data} onClose={close} />}</AnimatePresence>,
          document.body,
        )}
    </>
  );
}

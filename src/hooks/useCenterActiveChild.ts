import { useEffect, type RefObject } from "react";

export function useCenterActiveChild(containerRef: RefObject<HTMLElement | null>, activeIndex: number) {
  useEffect(() => {
    const container = containerRef.current;
    const child = container?.children[activeIndex] as HTMLElement | undefined;
    if (!container || !child) return;
    const offset = child.getBoundingClientRect().left - container.getBoundingClientRect().left;
    const left = container.scrollLeft + offset - (container.clientWidth - child.offsetWidth) / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [containerRef, activeIndex]);
}

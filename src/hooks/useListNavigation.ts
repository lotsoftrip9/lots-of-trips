"use client";

import { useState, type KeyboardEvent } from "react";

export function useListNavigation<T>(items: T[], onSelect: (item: T) => void) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousItems, setPreviousItems] = useState(items);

  if (items !== previousItems) {
    setPreviousItems(items);
    setActiveIndex(0);
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (!items.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + items.length) % items.length);
    } else if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault();
      onSelect(items[activeIndex]);
    }
  };

  return { activeIndex, setActiveIndex, onKeyDown };
}

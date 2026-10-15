"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={cn(
        "relative grid size-8 place-items-center rounded-full transition-colors duration-200 hover:bg-paper",
        className,
      )}
    >
      <Sun className="size-4 transition-all duration-300 dark:scale-0 dark:-rotate-90" aria-hidden />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" aria-hidden />
    </button>
  );
}

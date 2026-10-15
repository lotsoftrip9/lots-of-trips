import type { ReactNode } from "react";

interface QuoteFieldProps {
  label: string;
  aside?: ReactNode;
  children: ReactNode;
}

export function QuoteField({ label, aside, children }: QuoteFieldProps) {
  return (
    <div className="border-t border-line pt-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-[14px] font-medium">{label}</p>
        {aside}
      </div>
      {children}
    </div>
  );
}

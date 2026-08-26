import { useState, type ReactNode } from "react";

// ─── Tooltip ───────────────────────────────────────────────────────────────

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      data-bui-tooltip="true"
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div
        className={`absolute z-50 bg-surface-elev border border-border-strong rounded-md px-3 py-2 text-body-2 text-text-primary shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-[120ms] ${
          show ? "opacity-100" : "opacity-0"
        } ${positionClasses[position]}`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}

import { type ReactNode, useEffect, useCallback } from "react";

// ─── Drawer ──────────────────────────────────────────────────────────────────

type DrawerDirection = "left" | "right" | "top" | "bottom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  direction?: DrawerDirection;
  title?: string;
  children: ReactNode;
  className?: string;
}

const positionClasses: Record<DrawerDirection, string> = {
  left: "top-0 left-0 h-full w-72 border-r",
  right: "top-0 right-0 h-full w-72 border-l",
  top: "top-0 left-0 right-0 h-64 border-b",
  bottom: "bottom-0 left-0 right-0 h-64 border-t",
};

const slideFrom: Record<DrawerDirection, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const slideTo: Record<DrawerDirection, string> = {
  left: "translate-x-0",
  right: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
};

export function Drawer({
  open,
  onClose,
  direction = "right",
  title,
  children,
  className = "",
}: DrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div data-bui-drawer="true" className={className}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-overlay z-40 transition-opacity duration-[200ms]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed z-50 bg-surface border-border transition-transform duration-[200ms] ${
          positionClasses[direction]
        } ${open ? slideTo[direction] : slideFrom[direction]}`}
      >
        {/* Handle bar for bottom drawer */}
        {direction === "bottom" && (
          <div className="flex justify-center pt-2">
            <div className="w-10 h-1 rounded-full bg-border-strong" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title && (
            <h2 className="text-h3 font-bold text-text-primary">{title}</h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors ml-auto"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

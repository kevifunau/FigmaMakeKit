import { useEffect, useCallback, type ReactNode } from "react";

// ─── BottomSheet ───────────────────────────────────────────────────────────

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  className = "",
}: BottomSheetProps) {
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
    <div data-bui-bottom-sheet="true" className={className}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-overlay z-40 transition-opacity duration-[200ms]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border rounded-t-xl transition-transform duration-[200ms]"
      >
        {/* Handle bar */}
        <div className="w-10 h-1 rounded-full bg-border-strong mx-auto mt-3 mb-2" />

        {/* Header */}
        <div className="px-4 pb-2 flex items-center justify-between">
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
        <div className="px-4 pb-6 max-h-64 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

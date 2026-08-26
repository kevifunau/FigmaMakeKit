import { useEffect, useCallback } from "react";

// ─── Dialog ──────────────────────────────────────────────────────────────────

type DialogVariant = "default" | "danger";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  className?: string;
}

const confirmClasses: Record<DialogVariant, string> = {
  default:
    "bg-primary text-text-on-accent hover:bg-primary-hover active:bg-primary-press",
  danger:
    "bg-danger text-text-primary hover:bg-danger-hover active:bg-danger-press",
};

export function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "确认",
  cancelText = "取消",
  variant = "default",
  className = "",
}: DialogProps) {
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
    <div
      data-bui-dialog="true"
      className={`fixed inset-0 bg-overlay z-50 flex items-center justify-center ${className}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative bg-surface border border-border rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
      >
        <h2 className="text-h3 font-bold text-text-primary mb-2">{title}</h2>
        <p className="text-body-1 text-text-secondary mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md font-bold border transition-colors duration-[120ms] cursor-pointer inline-flex items-center justify-center h-7 px-3 text-body-2 bg-transparent text-text-primary border-border hover:bg-surface-elev hover:border-border-strong active:bg-surface active:scale-[0.97]"
            data-bui-dialog-cancel=""
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className={`rounded-md font-bold border transition-colors duration-[120ms] cursor-pointer inline-flex items-center justify-center h-7 px-3 text-body-2 active:scale-[0.97] ${confirmClasses[variant]}`}
              data-bui-dialog-confirm={variant}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { type ReactNode, useEffect, useCallback } from "react";

// ─── Modal ──────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, actions, className = "" }: ModalProps) {
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
      data-bui-modal="true"
      className={`fixed inset-0 bg-overlay z-50 flex items-center justify-center ${className}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-surface border border-border rounded-lg p-6 max-w-md w-full mx-4 relative">
        {title && (
          <h2 className="text-h2 font-bold text-text-primary mb-4">{title}</h2>
        )}
        {children}
        {actions && (
          <div className="flex flex-row gap-3 justify-end mt-6 pt-4 border-t border-border">
            {actions}
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-xl cursor-pointer transition-colors"
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
    </div>
  );
}

// ─── Toast ──────────────────────────────────────────────────────────────────

type ToastVariant = "info" | "success" | "warning" | "danger";

interface ToastProps {
  message: string;
  icon?: ReactNode;
  variant?: ToastVariant;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  info: "bg-secondary-soft border-secondary text-secondary",
  success: "bg-primary-soft border-primary text-primary",
  warning: "bg-warning-soft border-warning text-warning",
  danger: "bg-danger-soft border-danger text-danger",
};

export function Toast({
  message,
  icon,
  variant = "info",
  onClose,
  duration = 3000,
  className = "",
}: ToastProps) {
  useEffect(() => {
    if (!onClose || duration <= 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      data-bui-toast="true"
      className={`fixed bottom-4 right-4 z-50 bg-surface-elev border rounded-md px-4 py-3 text-body-1 shadow-lg flex items-center gap-3 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {icon && <span className="w-4.5 h-4.5 mr-2 flex-shrink-0">{icon}</span>}
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors ml-auto"
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

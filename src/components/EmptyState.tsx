import { type ReactNode } from "react";

// ─── EmptyState ────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  message,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      data-bui-empty="true"
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-surface-elev flex items-center justify-center mb-4">
          <span className="w-8 h-8 text-text-secondary">{icon}</span>
        </div>
      )}
      <h3 className="text-h3 font-bold text-text-primary mb-2">{title}</h3>
      {message && (
        <p className="text-body-1 text-text-secondary mb-6">{message}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

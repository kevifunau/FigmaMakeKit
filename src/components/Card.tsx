import { type ReactNode } from "react";

// ─── Card ──────────────────────────────────────────────────────────────────

interface CardProps {
  elevated?: boolean;
  padded?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({
  elevated = false,
  padded = false,
  className = "",
  children,
}: CardProps) {
  const base = elevated
    ? "bg-surface-elev border border-border-strong shadow-lg"
    : "bg-surface border border-border";

  return (
    <div
      data-bui-card="true"
      className={`${base} rounded-lg overflow-hidden${padded ? " p-4" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── InfoRow ───────────────────────────────────────────────────────────────

interface InfoRowProps {
  label: string;
  value: string;
  suffix?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function InfoRow({
  label,
  value,
  suffix,
  icon,
  className = "",
}: InfoRowProps) {
  return (
    <div
      data-bui-info-row="true"
      className={`flex items-center gap-3 py-2 px-4 border-b border-border last:border-b-0 ${className}`}
    >
      {icon && (
        <span className="w-4.5 h-4.5 text-text-secondary flex-shrink-0">
          {icon}
        </span>
      )}
      <span className="text-body-2 text-text-secondary flex-shrink-0">
        {label}
      </span>
      <span className="text-body-1 text-text-primary font-bold ml-auto">
        {value}
      </span>
      {suffix && (
        <span className="text-caption text-text-disabled ml-2">{suffix}</span>
      )}
    </div>
  );
}

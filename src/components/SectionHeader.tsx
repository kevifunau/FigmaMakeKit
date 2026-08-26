import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between mb-4 ${className}`}
      data-bui-section-header=""
    >
      <div className="flex flex-col">
        <h2 className="text-h2 font-bold text-text-primary">{title}</h2>
        {subtitle && (
          <span className="text-body-2 text-text-secondary mt-1">
            {subtitle}
          </span>
        )}
      </div>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}

/**
 * Navigation — SideNav (vertical rail) and BottomNav (mobile bar).
 *
 * Both accept an `items` array and an `onSelect` callback.
 * Active item is styled with primary token colors.
 */

import type React from 'react';

/* ── SideNav ──────────────────────────────────────────────────────── */

export interface SideNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: number;
}

export interface SideNavProps {
  items: SideNavItem[];
  onSelect?: (id: string) => void;
  className?: string;
}

export function SideNav(props: SideNavProps) {
  const { items, onSelect, className } = props;

  return (
    <nav
      data-bui-sidenav=""
      className={`w-16 h-full bg-surface border-r border-border flex flex-col items-center py-4 gap-2 ${className ?? ''}`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect?.(item.id)}
          className={[
            'w-12 h-12 rounded-lg flex items-center justify-center relative transition-colors',
            'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
            item.active && 'bg-primary-soft text-primary',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {item.icon}
          {typeof item.badge === 'number' && item.badge > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-danger text-text-primary text-[10px] flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

/* ── BottomNav ────────────────────────────────────────────────────── */

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  onSelect?: (id: string) => void;
  className?: string;
}

export function BottomNav(props: BottomNavProps) {
  const { items, onSelect, className } = props;

  return (
    <nav
      data-bui-bottomnav=""
      className={`h-16 bg-surface border-t border-border flex items-center justify-around px-2 ${className ?? ''}`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect?.(item.id)}
          className={[
            'flex flex-col items-center gap-1 transition-colors',
            item.active ? 'text-primary' : 'text-text-secondary',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {item.icon}
          <span className="text-caption">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

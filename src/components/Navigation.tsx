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

/* ── SideNavFull (full-width side navigation with labels) ─────────── */

export interface SideNavFullProps {
  items: SideNavItem[];
  onSelect?: (id: string) => void;
  className?: string;
}

export function SideNavFull(props: SideNavFullProps) {
  const { items, onSelect, className } = props;

  return (
    <nav
      data-bui-sidenav-full=""
      className={`w-48 h-full bg-surface border-r border-border flex flex-col py-4 gap-1 ${className ?? ''}`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect?.(item.id)}
          className={[
            'w-full h-10 px-4 flex items-center gap-3 rounded-md text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors cursor-pointer',
            item.active && 'bg-primary-soft text-primary',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {item.icon && <span className="w-4.5 h-4.5 flex-shrink-0">{item.icon}</span>}
          <span className="text-body-1 font-bold">{item.label}</span>
          {typeof item.badge === 'number' && item.badge > 0 && (
            <span className="ml-auto w-4 h-4 rounded-full bg-danger text-text-primary text-[10px] flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

/* ── Profile (avatar + name + chevron) ──────────────────────────── */

export interface ProfileProps {
  name: string;
  avatarSrc?: string;
  onClick?: () => void;
  className?: string;
}

export function Profile(props: ProfileProps) {
  const { name, avatarSrc, onClick, className } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 px-3 flex items-center gap-2 rounded-lg bg-surface-elev border border-border hover:border-border-strong transition-colors cursor-pointer ${className ?? ''}`}
      data-bui-profile=""
    >
      <span className="w-8 h-8 rounded-full bg-surface overflow-hidden">
        {avatarSrc ? (
          <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
        ) : (
          <svg className="w-full h-full text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        )}
      </span>
      <span className="text-body-1 text-text-primary font-bold truncate">{name}</span>
      {/* chevron-right */}
      <svg className="w-4 h-4 text-text-secondary ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

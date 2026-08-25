import type { ReactNode } from 'react';

// --- Badge (rarity pill) ---

type BadgeVariant = 'common' | 'rare' | 'epic' | 'legendary';

const badgeStyles: Record<BadgeVariant, string> = {
  common: 'bg-primary-soft text-rarity-common',
  rare: 'bg-secondary-soft text-rarity-rare',
  epic: 'bg-tertiary-soft text-rarity-epic',
  legendary: 'bg-warning-soft text-rarity-legendary',
};

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`h-5.5 px-2 rounded-sm text-caption font-bold tracking-wider uppercase inline-flex items-center justify-center ${badgeStyles[variant]}`}
      data-bui-badge={variant}
    >
      {children}
    </span>
  );
}

// --- Tag (filled pill) ---

type TagVariant = 'default' | 'amphibious' | 'aquatic' | 'nocturnal';

const tagStyles: Record<TagVariant, string> = {
  default: 'bg-surface-elev text-text-primary',
  amphibious: 'bg-warning text-text-on-accent',
  aquatic: 'bg-secondary-soft text-secondary border border-secondary',
  nocturnal: 'bg-tertiary-soft text-tertiary border border-tertiary',
};

interface TagProps {
  variant: TagVariant;
  children: ReactNode;
}

export function Tag({ variant, children }: TagProps) {
  return (
    <span
      className={`h-6 px-3 rounded-full text-caption font-bold inline-flex items-center justify-center ${tagStyles[variant]}`}
      data-bui-tag={variant}
    >
      {children}
    </span>
  );
}

// --- Chip (status chip) ---

type ChipVariant = 'equipped' | 'new' | 'owned' | 'limited' | 'event' | 'sale';

const chipStyles: Record<ChipVariant, string> = {
  equipped: 'bg-primary-soft border-primary text-primary',
  new: 'bg-primary-soft border-primary text-primary',
  owned: 'bg-transparent border-border-strong text-text-secondary',
  limited: 'bg-danger-soft border-danger text-danger',
  event: 'bg-secondary-soft border-secondary text-secondary',
  sale: 'bg-warning-soft border-warning text-warning',
};

interface ChipProps {
  variant: ChipVariant;
  icon?: ReactNode;
  children: ReactNode;
}

export function Chip({ variant, icon, children }: ChipProps) {
  return (
    <span
      className={`h-6 pl-2 pr-3 rounded-full border border-thin text-caption font-bold inline-flex items-center ${chipStyles[variant]}`}
      data-bui-chip={variant}
    >
      {icon && <span className="w-3.5 h-3.5 mr-2 flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

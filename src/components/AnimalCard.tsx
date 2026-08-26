import type { ReactNode } from 'react';

// ─── AnimalCard ─────────────────────────────────────────────────────────────

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

const rarityBorder: Record<Rarity, string> = {
  common: 'border-rarity-common',
  rare: 'border-rarity-rare',
  epic: 'border-rarity-epic',
  legendary: 'border-rarity-legendary',
};

interface AnimalCardProps {
  name: string;
  imageSrc?: string;
  rarity?: Rarity;
  selected?: boolean;
  onSelect?: () => void;
  level?: number;
  className?: string;
}

export function AnimalCard({
  name,
  imageSrc,
  rarity = 'common',
  selected = false,
  onSelect,
  level,
  className = '',
}: AnimalCardProps) {
  const borderClass = rarityBorder[rarity];
  const selectedClass = selected
    ? ' ring-2 ring-primary ring-offset-2 ring-offset-bg'
    : '';

  return (
    <div
      data-bui-animal-card={rarity}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
        }
      }}
      className={`w-50 bg-surface rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] ${borderClass}${selectedClass} ${className}`}
    >
      {/* Image area */}
      <div className="relative h-32 bg-surface-elev flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderIcon />
        )}

        {/* Selected check pill */}
        {selected && (
          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <CheckSvg />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="text-body-1 font-bold text-text-primary truncate">
          {name}
        </div>
        {level !== undefined && (
          <div className="text-caption text-text-secondary mt-0.5">
            Lv.{level}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Internal ───────────────────────────────────────────────────────────────

function PlaceholderIcon() {
  return (
    <svg
      className="w-10 h-10 text-text-disabled"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 4.5a2.5 2.5 0 0 0-2.5 2.5V9h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1V7a2.5 2.5 0 0 0-2.5-2.5Z" />
      <path d="M7 17.5c0 .83.67 1.5 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5" />
      <circle cx="9.5" cy="11.5" r="1" />
      <circle cx="14.5" cy="11.5" r="1" />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg
      className="w-3.5 h-3.5 text-text-on-accent"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8.5 7 12l5.5-7" />
    </svg>
  );
}

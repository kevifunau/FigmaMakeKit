import type { ReactNode } from 'react';

// ─── AnimalDetail ───────────────────────────────────────────────────────────

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

const rarityBadge: Record<Rarity, string> = {
  common: 'bg-primary-soft text-rarity-common',
  rare: 'bg-secondary-soft text-rarity-rare',
  epic: 'bg-tertiary-soft text-rarity-epic',
  legendary: 'bg-warning-soft text-rarity-legendary',
};

const rarityLabel: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

interface Stat {
  label: string;
  value: string;
}

interface AnimalDetailProps {
  name: string;
  images?: string[];
  rarity?: Rarity;
  description?: string;
  stats?: Stat[];
  actions?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function AnimalDetail({
  name,
  images,
  rarity = 'common',
  description,
  stats,
  actions,
  onClose,
  className = '',
}: AnimalDetailProps) {
  const badgeClass = rarityBadge[rarity];

  return (
    <div
      data-bui-animal-detail={rarity}
      className={`w-90 bg-surface rounded-lg overflow-hidden border border-border ${className}`}
    >
      {/* Hero section */}
      <div className="relative h-48 bg-surface-elev flex items-center justify-center">
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderHero />
        )}

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-overlay flex items-center justify-center text-text-primary cursor-pointer hover:bg-overlay/80 transition-colors"
            aria-label="Close"
          >
            <CloseSvg />
          </button>
        )}

        {/* Rarity badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded-sm text-caption font-bold ${badgeClass}`}
        >
          {rarityLabel[rarity]}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-h2 font-bold text-text-primary mb-2">{name}</h2>

        {description && (
          <p className="text-body-1 text-text-secondary mb-4">{description}</p>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="divide-y divide-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex justify-between py-2"
              >
                <span className="text-body-2 text-text-secondary">
                  {stat.label}
                </span>
                <span className="text-body-1 text-text-primary font-bold">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {actions && <div className="flex gap-3 mt-4">{actions}</div>}
      </div>
    </div>
  );
}

// ─── Internal ───────────────────────────────────────────────────────────────

function PlaceholderHero() {
  return (
    <svg
      className="w-16 h-16 text-text-disabled"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
      <path d="M2 7l10-4 10 4" />
      <path d="M12 3v7" />
    </svg>
  );
}

function CloseSvg() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

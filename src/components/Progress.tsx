/**
 * Progress — linear progress bar, spinner, and skeleton placeholder.
 *
 * `variant` on ProgressBar maps to a color token class.
 * Spinner sizes use Tailwind scale. Skeleton shapes are pure classes.
 */

/* ── ProgressBar ─────────────────────────────────────────────────── */

export interface ProgressBarProps {
  /** Current value 0–100. */
  value: number;
  /** Color variant — maps to a bg token class. */
  variant?: 'primary' | 'secondary' | 'health' | 'mana' | 'stamina' | 'xp';
  /** Track height in px. Default 8. */
  height?: number;
  className?: string;
}

const FILL_COLOR: Record<NonNullable<ProgressBarProps['variant']>, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  health: 'bg-health',
  mana: 'bg-mana',
  stamina: 'bg-stamina',
  xp: 'bg-xp',
};

export function ProgressBar(props: ProgressBarProps) {
  const { value, variant = 'primary', height = 8, className } = props;
  const clamped = Math.max(0, Math.min(100, value));
  const fillClass = FILL_COLOR[variant];

  return (
    <div
      data-bui-progress=""
      className={`w-full bg-surface-elev rounded-full overflow-hidden ${className ?? ''}`}
      style={{ height: `${height}px` }}
    >
      <div
        className={`h-full rounded-full transition-all duration-200 ${fillClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/* ── Spinner ──────────────────────────────────────────────────────── */

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SPINNER_SIZE: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function Spinner(props: SpinnerProps) {
  const { size = 'md', className } = props;

  return (
    <div
      data-bui-spinner=""
      className={`border-2 border-surface-elev border-t-primary rounded-full animate-spin ${SPINNER_SIZE[size]} ${className ?? ''}`}
    />
  );
}

/* ── Skeleton ─────────────────────────────────────────────────────── */

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'card';
  width?: number | string;
  height?: number | string;
  className?: string;
}

const SHAPE_CLASS: Record<NonNullable<SkeletonProps['variant']>, string> = {
  text: 'h-3 rounded-sm',
  circle: 'rounded-full',
  rect: 'rounded-md',
  card: '',
};

function resolveSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export function Skeleton(props: SkeletonProps) {
  const { variant = 'text', width, height, className } = props;

  if (variant === 'card') {
    return (
      <div
        data-bui-skeleton=""
        className={`w-50 h-55 bg-surface rounded-lg overflow-hidden border border-border ${className ?? ''}`}
      >
        <div className="h-32 bg-surface-elev animate-pulse" />
        <div className="p-3 space-y-2">
          <div className="h-3 w-3/4 bg-surface-elev rounded-sm animate-pulse" />
          <div className="h-3 w-1/2 bg-surface-elev rounded-sm animate-pulse" />
          <div className="h-3 w-2/3 bg-surface-elev rounded-sm animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      data-bui-skeleton=""
      className={`bg-surface-elev animate-pulse ${SHAPE_CLASS[variant]} ${className ?? ''}`}
      style={{ width: resolveSize(width), height: resolveSize(height) }}
    />
  );
}

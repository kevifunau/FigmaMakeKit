type MeterColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'warning'
  | 'danger'
  | 'health'
  | 'mana'
  | 'stamina'
  | 'xp';

type MeterSize = 'sm' | 'md' | 'lg';

interface MeterProps {
  current: number;
  max: number;
  label?: string;
  color?: MeterColor;
  size?: MeterSize;
  showText?: boolean;
  warningThreshold?: number;
  dangerThreshold?: number;
  className?: string;
}

const colorMap: Record<MeterColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  warning: 'bg-warning',
  danger: 'bg-danger',
  health: 'bg-danger',
  mana: 'bg-primary',
  stamina: 'bg-secondary',
  xp: 'bg-tertiary',
};

const sizeMap: Record<MeterSize, string> = {
  sm: 'h-[10px]',
  md: 'h-[20px]',
  lg: 'h-[24px]',
};

export function Meter({
  current,
  max,
  label,
  color = 'primary',
  size = 'md',
  showText = false,
  warningThreshold = 0.3,
  dangerThreshold = 0.15,
  className = '',
}: MeterProps) {
  const pct = max > 0 ? Math.min(current / max, 1) : 0;

  let resolvedColor = color;
  if (pct < dangerThreshold) {
    resolvedColor = 'danger';
  } else if (pct < warningThreshold) {
    resolvedColor = 'warning';
  }

  return (
    <div
      className={`flex flex-col gap-1 ${className}`}
      data-bui-meter=""
    >
      {(label || showText) && (
        <div className="flex justify-between text-caption text-text-secondary">
          {label && <span>{label}</span>}
          {showText && (
            <span>
              {current}/{max}
            </span>
          )}
        </div>
      )}
      <div className="w-full rounded-full bg-surface-elev overflow-hidden">
        <div
          className={`${sizeMap[size]} rounded-full ${colorMap[resolvedColor]} transition-all duration-[200ms]`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
}

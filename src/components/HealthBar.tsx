/**
 * HealthBar — game meter for health / mana / stamina / xp.
 *
 * `resource` controls COLOR only (maps to the game-status tokens bg-health,
 * bg-mana, bg-stamina, bg-xp); `variant` controls VISUAL STRUCTURE only
 * (segmented vs smooth). The two are orthogonal — a mana bar can be segmented.
 */

export interface HealthBarProps {
  current: number;
  max: number;
  /** Maps to a color token class: bg-health / bg-mana / bg-stamina / bg-xp. */
  resource?: 'health' | 'mana' | 'stamina' | 'xp';
  /** Visual structure: one smooth fill, or a row of discrete segments. */
  variant?: 'segmented' | 'smooth';
  /** Number of segments when `variant === 'segmented'`. */
  segments?: number;
  className?: string;
  /** Runtime-bound data map, serialized onto the root as `data-bindings`. */
  bindings?: Record<string, string>;
}

const COLOR_CLASS: Record<NonNullable<HealthBarProps['resource']>, string> = {
  health: 'bg-health',
  mana: 'bg-mana',
  stamina: 'bg-stamina',
  xp: 'bg-xp',
};

/** Joins class names, dropping falsy entries (Tailwind-style small helper). */
function join(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function HealthBar(props: HealthBarProps) {
  const {
    current,
    max,
    resource = 'health',
    variant = 'smooth',
    segments,
    className,
    bindings,
  } = props;

  const colorClass = COLOR_CLASS[resource];
  const showLabel = max <= 1000;

  return (
    <div
      data-bui-component="HealthBar"
      data-bui-variant={variant}
      data-bui-resource={resource}
      data-bindings={bindings ? JSON.stringify(bindings) : undefined}
      className={join('w-full', showLabel && 'flex flex-col gap-1', className)}
    >
      <div className="bg-surface-elev rounded-full h-2 w-full overflow-hidden">
        {variant === 'segmented' && typeof segments === 'number' && segments > 0 ? (
          <div className="flex gap-px h-full">
            {Array.from({ length: segments }, (_, index) => (
              <div
                key={index}
                className={join(
                  'flex-1 h-full rounded-sm',
                  index < Math.round((current / max) * segments) && colorClass,
                )}
              />
            ))}
          </div>
        ) : (
          <div
            className={join('h-full rounded-full transition-all', colorClass)}
            style={{ width: `${(current / max) * 100}%` }}
          />
        )}
      </div>
      {showLabel && (
        <div className="text-caption text-text-secondary">
          {current}/{max}
        </div>
      )}
    </div>
  );
}

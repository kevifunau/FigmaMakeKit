export interface Item {
  id: string;
  name: string;
  icon?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  quantity?: number;
}

export interface ItemSlotProps {
  item?: Item;
  selected?: boolean;
  className?: string;
  bindings?: Record<string, string>;
}

const rarityBorder: Record<NonNullable<Item['rarity']>, string> = {
  common: 'border-rarity-common',
  rare: 'border-rarity-rare',
  epic: 'border-rarity-epic',
  legendary: 'border-rarity-legendary',
};

const baseSlot =
  'w-12 h-12 rounded-md bg-surface-elev flex items-center justify-center relative';

export function ItemSlot({ item, selected, className, bindings }: ItemSlotProps) {
  const borderClass = item?.rarity ? rarityBorder[item.rarity] : 'border-border';
  const classes = [
    baseSlot,
    'border',
    borderClass,
    selected ? 'ring-2 ring-primary' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      data-bui-component="ItemSlot"
      data-bui-variant={item?.rarity || 'empty'}
      data-bindings={bindings ? JSON.stringify(bindings) : undefined}
      className={classes}
    >
      {item?.icon ? (
        <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain" />
      ) : (
        <span className="text-text-secondary text-body-1 font-semibold">
          {item?.name?.charAt(0)}
        </span>
      )}
      {item?.quantity && item.quantity > 1 ? (
        <span className="absolute bottom-0.5 right-1 text-caption text-text-primary">
          {item.quantity}
        </span>
      ) : null}
    </div>
  );
}

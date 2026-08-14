import { ItemSlot, type Item } from './ItemSlot';

export interface InventoryGridProps {
  rows: number;
  cols: number;
  items: Item[];
  className?: string;
  bindings?: Record<string, string>;
}

export function InventoryGrid({ rows, cols, items, className, bindings }: InventoryGridProps) {
  return (
    <div
      data-bui-component="InventoryGrid"
      data-bindings={bindings ? JSON.stringify(bindings) : undefined}
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(' + cols + ', minmax(0, 1fr))',
        gap: 'var(--spacing-2)',
      }}
    >
      {Array.from({ length: rows * cols }, (_, i) =>
        items[i] ? <ItemSlot key={items[i].id} item={items[i]} /> : <ItemSlot key={'empty-' + i} />
      )}
    </div>
  );
}

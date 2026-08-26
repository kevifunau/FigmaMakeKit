import type { ReactNode } from 'react';

interface RowProps {
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
  children: ReactNode;
}

interface ColProps {
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
  children: ReactNode;
}

interface SpacerProps {
  size?: number;
  className?: string;
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
} as const;

export function Row({
  gap,
  align,
  justify,
  className = '',
  children,
}: RowProps) {
  const classes = [
    'flex flex-row',
    gap !== undefined && `gap-${gap}`,
    align && alignMap[align],
    justify && justifyMap[justify],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-bui-row="">
      {children}
    </div>
  );
}

export function Col({
  gap,
  align,
  justify,
  className = '',
  children,
}: ColProps) {
  const classes = [
    'flex flex-col',
    gap !== undefined && `gap-${gap}`,
    align && alignMap[align],
    justify && justifyMap[justify],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-bui-col="">
      {children}
    </div>
  );
}

export function Spacer({ size, className = '' }: SpacerProps) {
  const classes = [
    'flex-shrink-0',
    size !== undefined && `w-${size} h-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} data-bui-spacer="" />;
}

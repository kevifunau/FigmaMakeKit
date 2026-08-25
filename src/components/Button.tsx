import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-text-on-accent hover:bg-primary-hover active:bg-primary-press active:scale-[0.97]',
  secondary:
    'bg-secondary text-text-primary hover:bg-secondary-hover active:bg-secondary-press active:scale-[0.97]',
  tertiary:
    'bg-tertiary text-text-primary hover:bg-tertiary-hover active:bg-tertiary-press active:scale-[0.97]',
  ghost:
    'bg-transparent text-text-primary border-border hover:bg-surface-elev hover:border-border-strong active:bg-surface active:scale-[0.97]',
  danger:
    'bg-danger text-text-primary hover:bg-danger-hover active:bg-danger-press active:scale-[0.97]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-body-2',
  md: 'h-9 px-4 text-body-1',
  lg: 'h-11 px-5 text-h3',
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  block?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon = false,
  block = false,
  disabled = false,
  children,
  onClick,
  className = '',
}: ButtonProps) {
  if (icon) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`w-9 h-9 p-0 rounded-md bg-surface-elev border-border text-text-primary items-center justify-center inline-flex font-bold text-body-1 border transition-colors duration-[120ms] cursor-pointer ${
          disabled
            ? 'bg-surface-elev text-text-disabled cursor-not-allowed'
            : 'hover:bg-surface-hover active:scale-[0.97]'
        } ${className}`}
        data-bui-button="icon"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md font-bold border transition-colors duration-[120ms] cursor-pointer inline-flex items-center justify-center ${
        block ? 'w-full' : ''
      } ${sizeClasses[size]} ${
        disabled
          ? 'bg-surface-elev text-text-disabled border-border cursor-not-allowed'
          : variantClasses[variant]
      } ${className}`}
      data-bui-button={variant}
    >
      {children}
    </button>
  );
}

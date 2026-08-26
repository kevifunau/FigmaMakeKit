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

const pressedClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-press',
  secondary: 'bg-secondary-press',
  tertiary: 'bg-tertiary-press',
  ghost: 'bg-surface border-border-strong',
  danger: 'bg-danger-press',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-body-2',
  md: 'h-9 px-4 text-body-1',
  lg: 'h-11 px-5 text-h3',
};

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as icon-only button (square, no text) */
  iconOnly?: boolean;
  /** Render with leading icon — provides the icon element */
  icon?: ReactNode;
  /** Enable icon+text flex-row layout (requires `icon` prop) */
  withIcon?: boolean;
  /** Lock the pressed/active visual state */
  pressed?: boolean;
  block?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  icon,
  withIcon = false,
  pressed = false,
  block = false,
  disabled = false,
  children,
  onClick,
  className = '',
}: ButtonProps) {
  if (iconOnly) {
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
          : pressed
            ? pressedClasses[variant]
            : variantClasses[variant]
      } ${className}`}
      data-bui-button={variant}
    >
      {withIcon && icon && (
        <span className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 inline-flex items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}

// ─── BackButton ────────────────────────────────────────────────────────────

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export function BackButton({ onClick, className = '' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-28 h-10 px-4 flex-row rounded-md font-bold border transition-colors duration-[120ms] cursor-pointer inline-flex items-center justify-center ${variantClasses.primary} ${className}`}
      data-bui-button="primary"
      data-bui-backbutton
    >
      <span className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 inline-flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M8.5 3L4.5 7L8.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      Back
    </button>
  );
}

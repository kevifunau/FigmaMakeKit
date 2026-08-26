import { useCallback } from 'react';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  disabled = false,
  className,
}: StepperProps) {
  const handleDecrement = useCallback(() => {
    if (!disabled && value > min) {
      onChange(Math.max(min, value - step));
    }
  }, [disabled, value, min, step, onChange]);

  const handleIncrement = useCallback(() => {
    if (!disabled && value < max) {
      onChange(Math.min(max, value + step));
    }
  }, [disabled, value, max, step, onChange]);

  const isAtMin = value <= min;
  const isAtMax = value >= max;

  return (
    <div
      className={`inline-flex items-center rounded-md border border-border bg-bg overflow-hidden ${className ?? ''}`}
      data-bui-stepper
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || isAtMin}
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors disabled:opacity-50"
        aria-label="Decrement"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 12h14" />
        </svg>
      </button>

      <span className="min-w-12 px-2 h-8 flex items-center justify-center text-body-1 font-bold text-text-primary border-x border-border">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || isAtMax}
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors disabled:opacity-50"
        aria-label="Increment"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

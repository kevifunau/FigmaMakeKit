import type { ReactNode } from 'react';

type InputType = 'text' | 'password' | 'search';

interface InputProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  icon,
  className = '',
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  if (type === 'search') {
    return (
      <div
        className={`h-10 flex-row items-center flex bg-bg border rounded-md px-3 transition-colors ${
          error
            ? 'border-danger'
            : 'border-border focus:border-primary hover:border-border-strong'
        } ${disabled ? 'bg-surface text-text-disabled border-border cursor-not-allowed' : ''} ${className}`}
        data-bui-search=""
      >
        {icon && (
          <span className="w-4.5 h-4.5 mr-3 flex-shrink-0 text-text-secondary">
            {icon}
          </span>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="flex-1 bg-transparent text-text-primary text-body-1 outline-none placeholder:text-text-disabled"
        />
        {value && value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange?.('')}
            className="w-4 h-4 ml-2 flex-shrink-0 text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Clear search"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="10" y2="10" />
              <line x1="10" y1="2" x2="2" y2="10" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={`h-10 bg-bg text-text-primary border rounded-md px-3 text-body-1 transition-colors outline-none placeholder:text-text-disabled ${
        error
          ? 'border-danger'
          : 'border-border focus:border-primary focus:bg-surface hover:border-border-strong'
      } ${disabled ? 'bg-surface text-text-disabled border-border cursor-not-allowed' : ''} ${className}`}
      data-bui-input={type}
    />
  );
}

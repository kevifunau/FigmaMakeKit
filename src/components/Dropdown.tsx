import { useState, useEffect, useRef, useCallback } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [close]);

  const handleSelect = (opt: DropdownOption) => {
    if (opt.disabled) return;
    onChange(opt.value);
    close();
  };

  return (
    <div ref={ref} className={`relative h-10 ${className}`} data-bui-dropdown="">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`w-full h-10 bg-bg text-text-primary border border-border rounded-md px-3 flex items-center justify-between transition-colors outline-none ${
          disabled
            ? 'bg-surface text-text-disabled cursor-not-allowed'
            : 'hover:border-border-strong focus:border-primary'
        }`}
      >
        <span className={`truncate text-body-1 ${selected ? '' : 'text-text-disabled'}`}>
          {selected?.label ?? placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`w-3 h-3 text-text-secondary ml-2 flex-shrink-0 transition-transform duration-[120ms] ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-elev border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
          {options.length === 0 ? (
            <span className="px-3 py-2 text-body-2 text-text-disabled block">
              No options
            </span>
          ) : (
            options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                disabled={opt.disabled}
                onClick={() => handleSelect(opt)}
                className={`w-full px-3 py-2 text-body-1 text-left transition-colors ${
                  opt.value === value
                    ? 'bg-primary-soft text-primary'
                    : opt.disabled
                      ? 'text-text-disabled cursor-not-allowed'
                      : 'text-text-primary hover:bg-surface-hover cursor-pointer first:rounded-t-md last:rounded-b-md'
                }`}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

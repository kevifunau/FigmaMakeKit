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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const close = useCallback(() => {
    setOpen(false);
    setHighlightedIndex(-1);
  }, []);

  /* ── Close on outside click / Escape ──────────────────────────── */

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

  /* ── Reset highlight when popup closes ────────────────────────── */

  useEffect(() => {
    if (!open) setHighlightedIndex(-1);
  }, [open]);

  /* ── Keyboard navigation ──────────────────────────────────────── */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : prev;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && options[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (highlightedIndex >= 0 && !options[highlightedIndex].disabled) {
            handleSelect(options[highlightedIndex]);
          }
          break;
        }
      }
    },
    [open, highlightedIndex, options],
  );

  /* ── Selection ────────────────────────────────────────────────── */

  const handleSelect = (opt: DropdownOption) => {
    if (opt.disabled) return;
    onChange(opt.value);
    close();
  };

  /* ── Scroll highlighted into view ─────────────────────────────── */

  useEffect(() => {
    if (highlightedIndex < 0) return;
    const container = ref.current?.querySelector('[data-bui-dropdown-list]');
    const item = container?.children[highlightedIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  return (
    <div
      ref={ref}
      className={`relative h-10 ${className}`}
      data-bui-dropdown=""
      onKeyDown={handleKeyDown}
    >
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
        <div
          data-bui-dropdown-list=""
          className="absolute top-full left-0 right-0 mt-1 bg-surface-elev border border-border rounded-md shadow-xl z-50 max-h-60 overflow-y-auto animate-[fadeIn_120ms_ease-out]"
        >
          {options.length === 0 ? (
            <span className="px-3 py-2 text-body-2 text-text-disabled block">
              No options
            </span>
          ) : (
            options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isHighlighted = i === highlightedIndex;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt)}
                  className={`w-full px-3 py-2 text-body-1 text-left transition-colors flex items-center ${
                    isSelected
                      ? 'bg-primary-soft text-primary'
                      : opt.disabled
                        ? 'text-text-disabled cursor-not-allowed'
                        : `text-text-primary cursor-pointer first:rounded-t-md last:rounded-b-md ${
                            isHighlighted ? 'bg-surface-hover' : 'hover:bg-surface-hover'
                          } active:bg-surface`
                  }`}
                >
                  <span className="truncate flex-1">{opt.label}</span>
                  {isSelected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="w-3 h-3 text-primary ml-auto flex-shrink-0"
                    >
                      <path
                        d="M2.5 6.5L5 9L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

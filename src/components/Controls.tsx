// ─── Toggle ─────────────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  disabled = false,
  className = "",
}: ToggleProps) {
  return (
    <button
      type="button"
      data-bui-toggle="true"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors duration-[200ms] relative ${
        checked ? "bg-primary" : "bg-surface-elev"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      <span
        className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform duration-[200ms] ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ─── Checkbox ───────────────────────────────────────────────────────────────

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  className = "",
}: CheckboxProps) {
  return (
    <label
      data-bui-checkbox="true"
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${className}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-colors ${
          checked
            ? "bg-primary border-primary"
            : "bg-bg border-border"
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {label && <span className="text-body-1 text-text-primary">{label}</span>}
    </label>
  );
}

// ─── Radio ──────────────────────────────────────────────────────────────────

interface RadioProps {
  selected: boolean;
  onChange: () => void;
  label?: string;
  name?: string;
  className?: string;
}

export function Radio({
  selected,
  onChange,
  label,
  name,
  className = "",
}: RadioProps) {
  return (
    <label
      data-bui-radio="true"
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${className}`}
    >
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        name={name}
        onClick={onChange}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected ? "border-primary" : "border-border"
        }`}
      >
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </button>
      {label && <span className="text-body-1 text-text-primary">{label}</span>}
    </label>
  );
}

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
}

export function Textarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  maxLength,
  rows = 4,
  className = '',
}: TextareaProps) {
  return (
    <div className={`flex flex-col ${className}`} data-bui-textarea="">
      <textarea
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-h-24 bg-bg text-text-primary border rounded-md p-3 text-body-1 resize-y transition-colors outline-none placeholder:text-text-disabled ${
          error
            ? 'border-danger'
            : 'border-border focus:border-primary hover:border-border-strong'
        } focus:bg-surface ${
          disabled ? 'bg-surface text-text-disabled cursor-not-allowed' : ''
        }`}
      />
      {maxLength !== undefined && (
        <span className="text-caption text-text-disabled text-right mt-1">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}

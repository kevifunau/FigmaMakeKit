import type React from 'react';

export interface DialogueBoxProps {
  speakerName: string;
  portrait?: React.ReactNode;
  text: string;
  onContinue?: () => void;
  className?: string;
  bindings?: Record<string, string>;
}

export function DialogueBox({
  speakerName,
  portrait,
  text,
  onContinue,
  className,
  bindings,
}: DialogueBoxProps) {
  return (
    <div
      data-bui-component="DialogueBox"
      data-bui-variant="bottom"
      data-bindings={bindings ? JSON.stringify(bindings) : undefined}
      className={`flex gap-4 p-4 bg-surface border border-border rounded-lg${className ? ` ${className}` : ''}`}
    >
      <div className="w-16 h-16 rounded-md bg-surface-elev flex items-center justify-center overflow-hidden">
        {portrait ? (
          portrait
        ) : (
          <div className="text-h3 text-text-secondary font-semibold">
            {speakerName.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="text-h3 font-semibold text-text-primary">{speakerName}</div>
        <div className="text-body-1 text-text-secondary">{text}</div>
        {onContinue ? (
          <button
            onClick={onContinue}
            className="self-end px-4 py-2 bg-primary text-text-on-accent rounded-full text-body-1 hover:bg-primary-hover transition-colors duration-[var(--duration-fast)]"
          >
            Continue
          </button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Slider — single-value and dual-thumb range slider.
 *
 * Translate from the Unity DS `.ds-slider` parent rules.
 * Two components: `Slider` (single) and `Range` (dual thumb).
 */

import { useCallback, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function join(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Clamp a number between min and max, then snap to step. */
function snap(value: number, min: number, max: number, step: number): number {
  const clamped = Math.min(Math.max(value, min), max);
  const remainder = (clamped - min) % step;
  // Snap to nearest step; when remainder is exactly half-step, round up.
  const snapped =
    remainder >= step / 2
      ? clamped + (step - remainder)
      : clamped - remainder;
  return Math.min(Math.max(snapped, min), max);
}

/** Convert a percentage (0-100) to a value within [min, max] snapped to step. */
function percentToValue(percent: number, min: number, max: number, step: number): number {
  return snap(min + (percent / 100) * (max - min), min, max, step);
}

/* ------------------------------------------------------------------ */
/*  Slider (single value)                                             */
/* ------------------------------------------------------------------ */

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  /* ---- pointer helpers ---- */

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
      onChange(percentToValue(pct, min, max, step));
    },
    [min, max, step, onChange],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragging.current = true;
      valueFromPointer(e.clientX);
    },
    [disabled, valueFromPointer],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || !dragging.current) return;
      valueFromPointer(e.clientX);
    },
    [disabled, valueFromPointer],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  /* ---- click on track ---- */

  const onTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      valueFromPointer(e.clientX);
    },
    [disabled, valueFromPointer],
  );

  return (
    <div
      data-bui-slider
      className={join('flex items-center gap-3', disabled && 'opacity-50 pointer-events-none', className)}
    >
      {/* Track */}
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className="flex-1 h-1.5 bg-surface-elev rounded-full relative cursor-pointer select-none touch-none"
        onClick={onTrackClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-[200ms]"
          style={{ width: `${percent}%` }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-white border-2 border-primary rounded-full shadow transition-transform hover:scale-110 active:scale-95"
          style={{ left: `calc(${percent}% - 9px)` }}
        />
      </div>

      {/* Value label */}
      {showValue && (
        <span className="text-body-2 text-text-secondary min-w-8 text-right tabular-nums">
          {value}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Range (dual thumb)                                                */
/* ------------------------------------------------------------------ */

export interface RangeProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Range({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}: RangeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<'min' | 'max' | null>(null);

  const minPercent = max > min ? ((minValue - min) / (max - min)) * 100 : 0;
  const maxPercent = max > min ? ((maxValue - min) / (max - min)) * 100 : 0;

  /* ---- pointer helpers ---- */

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track || !activeThumb.current) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
      const raw = percentToValue(pct, min, max, step);

      if (activeThumb.current === 'min') {
        onMinChange(Math.min(raw, maxValue));
      } else {
        onMaxChange(Math.max(raw, minValue));
      }
    },
    [min, max, step, minValue, maxValue, onMinChange, onMaxChange],
  );

  const onPointerDown = useCallback(
    (thumb: 'min' | 'max') => (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      activeThumb.current = thumb;
      valueFromPointer(e.clientX);
    },
    [disabled, valueFromPointer],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || !activeThumb.current) return;
      valueFromPointer(e.clientX);
    },
    [disabled, valueFromPointer],
  );

  const onPointerUp = useCallback(() => {
    activeThumb.current = null;
  }, []);

  /* ---- click on track ---- */

  const onTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const raw = percentToValue(pct, min, max, step);

      // Move whichever thumb is closer.
      const distToMin = Math.abs(raw - minValue);
      const distToMax = Math.abs(raw - maxValue);
      if (distToMin <= distToMax) {
        onMinChange(Math.min(raw, maxValue));
      } else {
        onMaxChange(Math.max(raw, minValue));
      }
    },
    [disabled, min, max, step, minValue, maxValue, onMinChange, onMaxChange],
  );

  return (
    <div
      data-bui-range
      className={join('flex items-center gap-3', disabled && 'opacity-50 pointer-events-none', className)}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex-1 h-1.5 bg-surface-elev rounded-full relative cursor-pointer select-none touch-none"
        onClick={onTrackClick}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Fill between thumbs */}
        <div
          className="absolute top-0 h-full bg-primary rounded-full transition-all duration-[200ms]"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={maxValue}
          aria-valuenow={minValue}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-white border-2 border-primary rounded-full shadow transition-transform hover:scale-110 active:scale-95 z-10"
          style={{ left: `calc(${minPercent}% - 9px)` }}
          onPointerDown={onPointerDown('min')}
        />

        {/* Max thumb */}
        <div
          role="slider"
          aria-valuemin={minValue}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 bg-white border-2 border-primary rounded-full shadow transition-transform hover:scale-110 active:scale-95 z-10"
          style={{ left: `calc(${maxPercent}% - 9px)` }}
          onPointerDown={onPointerDown('max')}
        />
      </div>
    </div>
  );
}

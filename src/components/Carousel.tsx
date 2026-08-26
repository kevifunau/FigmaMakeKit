import { useState, useEffect, useCallback } from 'react';

// ─── Carousel ───────────────────────────────────────────────────────────────

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function Carousel({
  images,
  autoPlay = false,
  interval = 3000,
  className = '',
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, next, total]);

  if (total === 0) return null;

  return (
    <div
      data-bui-carousel="true"
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-[200ms] ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={`Slide ${i + 1}`}
            className="w-full h-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Prev arrow */}
      {total > 1 && (
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-overlay flex items-center justify-center text-text-primary cursor-pointer hover:bg-overlay/80 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Next arrow */}
      {total > 1 && (
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-overlay flex items-center justify-center text-text-primary cursor-pointer hover:bg-overlay/80 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all ${
                i === current
                  ? 'w-4 h-2 bg-text-primary'
                  : 'w-2 h-2 bg-overlay'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Internal ───────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3l-5 5 5 5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

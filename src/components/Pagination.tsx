import { useMemo } from 'react';

// --- Pagination ---

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function generatePages(
  current: number,
  total: number,
  siblingCount: number,
): (number | 'ellipsis')[] {
  if (total <= 1) return [1];

  const pages: (number | 'ellipsis')[] = [];
  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  pages.push(1);

  if (showLeftEllipsis) {
    pages.push('ellipsis');
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push('ellipsis');
  }

  if (total > 1) pages.push(total);

  return pages;
}

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 3.5L5 7l3.5 3.5" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 3.5L9 7l-3.5 3.5" />
  </svg>
);

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => generatePages(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount],
  );

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const btnBase =
    'w-8 h-8 rounded-md text-body-2 font-bold flex items-center justify-center transition-colors';
  const btnDefault = 'text-text-secondary hover:bg-surface-hover hover:text-text-primary';
  const btnActive = 'bg-primary text-text-on-accent';
  const btnDisabled = 'text-text-disabled cursor-not-allowed';

  return (
    <nav
      className={`flex items-center gap-1 ${className ?? ''}`}
      data-bui-pagination
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        type="button"
        className={`${btnBase} ${btnDefault} ${btnDisabled}`}
        disabled={isFirst}
        onClick={() => onChange(currentPage - 1)}
        aria-label="Previous page"
        data-bui-pagination-prev
      >
        <ChevronLeft />
      </button>

      {pages.map((page, idx) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-text-disabled text-body-2"
              data-bui-pagination-ellipsis
              aria-hidden
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            className={`${btnBase} ${isActive ? btnActive : btnDefault}`}
            onClick={() => onChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            data-bui-pagination-page={page}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        className={`${btnBase} ${btnDefault} ${btnDisabled}`}
        disabled={isLast}
        onClick={() => onChange(currentPage + 1)}
        aria-label="Next page"
        data-bui-pagination-next
      >
        <ChevronRight />
      </button>
    </nav>
  );
}

'use client';

type PaginationProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export function Pagination({ current, total, onChange }: PaginationProps) {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center gap-2 pt-4">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="px-3 py-1 rounded-lg border disabled:opacity-40"
      >
        Anterior
      </button>

      {Array.from({ length: total }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`px-3 py-1 rounded-lg border ${
              page === current
                ? 'bg-slate-900 text-white'
                : 'hover:bg-slate-100'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="px-3 py-1 rounded-lg border disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  );
}

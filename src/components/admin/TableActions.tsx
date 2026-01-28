import Link from 'next/link';

export function TableActions({
  editHref,
  onDelete,
}: {
  editHref: string;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={editHref}
        className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-white hover:bg-slate-800"
      >
        Editar
      </Link>

      {onDelete && (
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

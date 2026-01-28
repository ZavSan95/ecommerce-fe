'use client';

import React from 'react';

type Column<T> = {
  key: keyof T | 'actions';
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
};

export function AdminTable<T extends { id: string | number }>({
  columns,
  data,
  renderActions,
}: AdminTableProps<T>) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* ===== Desktop ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map(col => (
                <th
                  key={col.label}
                  className={`px-4 py-3 text-left font-semibold text-slate-600 ${col.className ?? ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map(row => (
              <tr key={row.id} className="hover:bg-slate-50 transition">
                {columns.map(col => (
                  <td key={col.label} className="px-4 py-3 align-middle">
                    {col.key === 'actions'
                      ? renderActions?.(row)
                      : col.render
                        ? col.render(row)
                        : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile ===== */}
      <div className="md:hidden divide-y">
        {data.map(row => (
          <div key={row.id} className="p-4 space-y-3">
            {columns
              .filter(col => col.key !== 'actions')
              .map(col => (
                <div key={col.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">{col.label}</span>
                  <span className="font-medium text-right">
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? '')}
                  </span>
                </div>
              ))}

            {renderActions && (
              <div className="pt-2 flex justify-end gap-2">
                {renderActions(row)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

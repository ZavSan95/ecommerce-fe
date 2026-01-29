'use client';

import { useEffect, useState } from 'react';
import { AdminTable } from '@/components/admin/AdminTable';
import { TableActions } from '@/components/admin/TableActions';
import { fetchCategories } from '@/services/categories.service';
import { Pagination } from '@/components/ui/pagination/Pagination';

import { Category } from '@/interfaces/categories.interface';
import { CategoryRow } from '@/interfaces/category-row.interface';
import { PaginationMeta } from '@/interfaces/pagination.interface';

export default function CategoriesAdminPage() {

  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCategories({ page, limit: 10 })
      .then(res => {
        // 🔁 Mapeo de modelo API → modelo UI
        const mappedRows: CategoryRow[] = res.data.map((cat: Category) => ({
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
        }));

        setRows(mappedRows);
        setMeta(res.meta);
      })
      .catch(err => {
        console.error('Error cargando categorías', err);
      });
  }, [page]);

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorías</h1>

        <a
          href="/admin/categories/new"
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          Nueva categoría
        </a>
      </div>

      {/* Tabla */}
      <AdminTable<CategoryRow>
        columns={[
          { key: 'name', label: 'Nombre' },
          { key: 'slug', label: 'Slug', className: 'text-slate-500' },
          { key: 'actions', label: 'Acciones', className: 'text-right' },
        ]}
        data={rows}
        renderActions={row => (
          <TableActions
            editHref={`/admin/categories/${row.id}/edit`}
            onDelete={() => alert(`Eliminar ${row.name}`)}
          />
        )}
      />

      {/* Paginación */}
      {meta && (
        <Pagination
          current={meta.currentPage}
          total={meta.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}

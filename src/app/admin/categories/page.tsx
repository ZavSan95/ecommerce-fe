'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { AdminTable } from '@/components/admin/AdminTable';
import { TableActions } from '@/components/admin/TableActions';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { ConfirmDialog } from '@/components/ui/dialogs/ConfirmDialog';

import {
  deleteCategory,
  fetchCategories,
  toggleStatusCategory,
} from '@/services/categories.service';

import { Category } from '@/interfaces/categories.interface';
import { CategoryRow } from '@/interfaces/category-row.interface';
import { PaginationMeta } from '@/interfaces/pagination.interface';


export default function CategoriesAdminPage() {
  const router = useRouter();

  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  const [deleteTarget, setDeleteTarget] =
    useState<CategoryRow | null>(null);

  useEffect(() => {
    fetchCategories({ page, limit: 10 })
        .then(res => {
          const mappedRows: CategoryRow[] = res.data.map(
            (cat: Category) => ({
              id: cat._id,
              name: cat.name,
              slug: cat.slug,
              status: cat.status,
            })
          );

          setRows(mappedRows);
          setMeta(res.meta);
        })
        .catch(err => {
          console.error('Error cargando categorías', err);
          toast.error('Error cargando categorías');
        });
  }, [page]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteCategory(deleteTarget.id);

      toast.success('Categoría eliminada correctamente');

      // ✅ actualizar tabla localmente
      setRows(prev =>
        prev.filter(row => row.id !== deleteTarget.id)
      );

      setMeta(prev =>
        prev
          ? {
              ...prev,
              totalItems: prev.totalItems - 1,
            }
          : prev
      );

    } catch {
      toast.error('Error al eliminar la categoría');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleToggleStatus = async (row: CategoryRow) => {
    try {
      
      const res = await toggleStatusCategory(row.id);

      setRows(
        prev => prev.map( r => r.id === row.id ? {...r, status: res.status} : r)
      );

      toast.success(
        res.status === 'active' ? 'Categoría Activa' : 'Categoría Desactivada'
      );
      
    } catch (error) {
        toast.error('No se pudo cambiar el estado');
    }
  };


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
          {
            key: 'slug',
            label: 'Slug',
            className: 'text-slate-500',
          },
          {
            key: 'status',
            label: 'Estado',
            render: row => (
              <button
                onClick={() => handleToggleStatus(row)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium transition
                  ${row.status === 'active'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}
                `}
              >
                {row.status === 'active' ? 'Activa' : 'Inactiva'}
              </button>
            ),
          },
          {
            key: 'actions',
            label: 'Acciones',
            className: 'text-right',
          },
        ]}
        data={rows}
        renderActions={row => (
          <TableActions
            editHref={`/admin/categories/edit/${row.id}`}
            onDelete={() => setDeleteTarget(row)}
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

      {/* Modal confirmación */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar categoría"
        description={
          deleteTarget
            ? `¿Seguro que querés eliminar la categoría "${deleteTarget.name}"?`
            : ''
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

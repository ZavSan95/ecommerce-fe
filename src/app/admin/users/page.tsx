'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { AdminTable } from '@/components/admin/AdminTable';
import { TableActions } from '@/components/admin/TableActions';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { ConfirmDialog } from '@/components/ui/dialogs/ConfirmDialog';

import {
  fetchUsers,
  toggleStatusUser,
  deleteUser,
} from '@/services/auth.service';

import { User } from '@/interfaces/user.interface';
import { UserRow } from '@/interfaces/user-row.interface';
import { PaginationMeta } from '@/interfaces/pagination.interface';

export default function UsersAdminPage() {
  const router = useRouter();

  const [rows, setRows] = useState<UserRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  const [deleteTarget, setDeleteTarget] =
    useState<UserRow | null>(null);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchUsers({ page, limit: 10 })
      .then(res => {
        const mappedRows: UserRow[] = res.data.map(
          (user: User) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.isActive ? 'Activo' : 'Inactivo',
          })
        );


        setRows(mappedRows);
        setMeta(res.meta);
      })
      .catch(err => {
        console.error('Error cargando usuarios', err);
        toast.error('Error cargando usuarios');
      });
  }, [page]);

  /* ================= DELETE ================= */

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteUser(deleteTarget.id);

      toast.success('Usuario eliminado correctamente');

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
      toast.error('Error al eliminar el usuario');
    } finally {
      setDeleteTarget(null);
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const handleToggleStatus = async (row: UserRow) => {
    try {
      const res = await toggleStatusUser(row.id);

      const newStatus: UserRow['status'] =
        res.status === 'active' ? 'Activo' : 'Inactivo';

      setRows(prev =>
        prev.map(r =>
          r.id === row.id ? { ...r, status: newStatus } : r
        )
      );

      toast.success(
        newStatus === 'Activo'
          ? 'Usuario activado'
          : 'Usuario desactivado'
      );
    } catch {
      toast.error('No se pudo cambiar el estado');
    }
  };


  /* ================= RENDER ================= */

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>

        <a
          href="/admin/users/new"
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          Nuevo usuario
        </a>
      </div>

      {/* Tabla */}
      <AdminTable<UserRow>
        columns={[
          { key: 'email', label: 'Email', className: 'text-slate-500' },
          { key: 'name', label: 'Nombre' },
          {
            key: 'status',
            label: 'Estado',
            render: row => (
              <button
                onClick={() => handleToggleStatus(row)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium transition
                  ${
                    row.status === 'Activo'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }
                `}
              >
                {row.status}
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
            editHref={`/admin/users/edit/${row.id}`}
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
        title="Eliminar usuario"
        description={
          deleteTarget
            ? `¿Seguro que querés eliminar al usuario "${deleteTarget.name}"?`
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

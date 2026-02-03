'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AdminTable } from '@/components/admin/AdminTable';
import { TableActions } from '@/components/admin/TableActions';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { ConfirmDialog } from '@/components';

import { getProductById, getProducts } from '@/services/products.service';
import { deleteProductWithImages } from '@/hooks/deleteProductWithImages';

import { PaginationMeta } from '@/interfaces/pagination.interface';
import { ProductRow } from '@/interfaces/product-row.interface';
import { PopulatedCategory, Product } from '@/interfaces';

import toast from 'react-hot-toast';

function isPopulatedCategory(
  category: Product['categoryId']
): category is PopulatedCategory {
  return typeof category === 'object' && category !== null;
}

export default function ProductsAdminPage() {
  const router = useRouter();

  const [rows, setRows] = useState<ProductRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);


  const [deleteTarget, setDeleteTarget] =
    useState<ProductRow | null>(null);

  /* ===================== */
  /* Cargar productos      */
  /* ===================== */
  useEffect(() => {
    getProducts({ page, limit: 10 })
      .then(res => {
        const mappedRows: ProductRow[] = res.data.map(
          (product: Product) => {
            const defaultVariant =
              product.variants.find(v => v.isDefault) ??
              product.variants[0];

            const totalStock = product.variants.reduce(
              (acc, v) => acc + v.stock,
              0
            );

            return {
              id: product._id,
              name: product.name,
              category: isPopulatedCategory(product.categoryId)
                ? product.categoryId.name
                : '—',
              price: defaultVariant?.price ?? 0,
              stock: totalStock,
              status: product.status,
            };
          }
        );

        setRows(mappedRows);
        setMeta(res.meta);
      })
      .catch(err => {
        console.error('Error cargando productos', err);
      });
  }, [page]);

  /* ===================== */
  /* Confirmar delete      */
  /* ===================== */
  const handleConfirmDelete = async () => {
    if (!deleteTarget || isDeleting) return;

    try {
      setIsDeleting(true);

      const product = await getProductById(deleteTarget.id);

      await deleteProductWithImages({
        id: deleteTarget.id,
        variants: product.variants,
      });

      toast.success('Producto eliminado correctamente');

      // 🔽 actualizar tabla local (ver problema 2)
      setRows(prev => prev.filter(r => r.id !== deleteTarget.id));
      setMeta(prev =>
        prev
          ? { ...prev, totalItems: prev.totalItems - 1 }
          : prev
      );

      setDeleteTarget(null);

    } catch (error) {
      console.error(error);
      toast.error('No se pudo eliminar el producto');
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>

        <a
          href="/admin/products/new"
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          Nuevo producto
        </a>
      </div>

      {/* Tabla */}
      <AdminTable<ProductRow>
        columns={[
          { key: 'name', label: 'Producto' },
          { key: 'category', label: 'Categoría' },
          {
            key: 'price',
            label: 'Precio',
            render: row => `$${row.price.toLocaleString()}`,
          },
          {
            key: 'stock',
            label: 'Stock',
            render: row => (
              <span className={row.stock === 0 ? 'text-red-600' : ''}>
                {row.stock}
              </span>
            ),
          },
          { key: 'status', label: 'Estado' },
          { key: 'actions', label: 'Acciones', className: 'text-right' },
        ]}
        data={rows}
        renderActions={row => (
          <TableActions
            editHref={`/admin/products/edit/${row.id}`}
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
        title="Eliminar producto"
        description={
          deleteTarget
            ? `¿Seguro que querés eliminar el producto "${deleteTarget.name}"?`
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

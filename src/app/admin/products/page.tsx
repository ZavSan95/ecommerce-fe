'use client';

import { useEffect, useState } from 'react';

import { AdminTable } from '@/components/admin/AdminTable';
import { TableActions } from '@/components/admin/TableActions';
import { Pagination } from '@/components/ui/pagination/Pagination';

import { getProducts } from '@/services/products.service';
import { PaginationMeta } from '@/interfaces/pagination.interface';
import { ProductRow } from '@/interfaces/product-row.interface';
import { PopulatedCategory, Product } from '@/interfaces';


function isPopulatedCategory(
  category: Product['categoryId']
): category is PopulatedCategory {
  return typeof category === 'object' && category !== null;
}

export default function ProductsAdminPage() {

  const [rows, setRows] = useState<ProductRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts({ page, limit: 10 })
      .then(res => {

        console.log(res);

      const mappedRows: ProductRow[] = res.data.map((product: Product) => {

        const defaultVariant =
          product.variants.find(v => v.isDefault) ?? product.variants[0];

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
      });

        setRows(mappedRows);
        setMeta(res.meta);
      })
      .catch(err => {
        console.error('Error cargando productos', err);
      });
  }, [page]);

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
            editHref={`/admin/products/${row.id}/edit`}
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

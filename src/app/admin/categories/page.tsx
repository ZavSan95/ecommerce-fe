'use client';
import { AdminTable } from "@/components/admin/AdminTable";
import { TableActions } from "@/components/admin/TableActions";
import { fetchCategories } from "@/services/categories.service";

type Category = {
  id: number;
  name: string;
  slug: string;
  productsCount: number;
};



const categories: Category[] = [
  { id: 1, name: 'Electrónica', slug: 'electronica', productsCount: 42 },
  { id: 2, name: 'Hogar', slug: 'hogar', productsCount: 18 },
  { id: 3, name: 'Deportes', slug: 'deportes', productsCount: 27 },
];

export default async function CategoriesAdminPage() {

  const categorias = await fetchCategories();
  

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorías</h1>

        <a
          href="/admin/categories/new"
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          Nueva categoría
        </a>
      </div>

      <AdminTable<Category>
        columns={[
          { key: 'name', label: 'Nombre' },
          { key: 'slug', label: 'Slug', className: 'text-slate-500' },
          {
            key: 'productsCount',
            label: 'Productos',
            render: row => (
              <span className="px-2 py-1 rounded-lg text-xs bg-slate-100">
                {row.productsCount}
              </span>
            ),
          },
          { key: 'actions', label: 'Acciones', className: 'text-right' },
        ]}
        data={categories}
        renderActions={row => (
          <TableActions
            editHref={`/admin/categories/${row.id}/edit`}
            onDelete={() => alert(`Eliminar ${row.name}`)}
          />
        )}
      />
    </div>
  );
}

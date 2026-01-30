import { CategoryForm } from '@/components/admin/categories/CategoryForm';
import { getCategoryById } from '@/services/categories.service';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = params;

  const category = await getCategoryById(id);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Editar categoría</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 max-w-xl">
        <CategoryForm
          key={category.updatedAt}
          categoryId={id}
          isEdit
          defaultValues={{
            name: category.name,
            description: category.description ?? '',
          }}
        />
      </div>
    </div>
  );
}

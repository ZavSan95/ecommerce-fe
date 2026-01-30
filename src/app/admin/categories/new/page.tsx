import { CategoryForm } from '@/components/admin/categories/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Nueva categoría
        </h1>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 max-w-xl">
        <CategoryForm />
      </div>

    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { createCategory, updateCategory } from '@/services/categories.service';
import { CategoryFormData, categorySchema } from '@/schemas/new-category.schema';

interface Props {
  categoryId?: string;
  defaultValues?: CategoryFormData;
  isEdit?: boolean;
}

export function CategoryForm({ defaultValues, isEdit = false, categoryId }: Props) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEdit && categoryId) {
        await updateCategory(categoryId, data);
        toast.success('Categoría actualizada correctamente');
      } else {
        await createCategory(data);
        toast.success('Categoría creada correctamente');
      }
      router.replace('/admin/categories');
      router.refresh();

    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.message ?? 'Ocurrió un error al guardar la categoría'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Nombre */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Nombre
        </label>
        <input
          {...register('name')}
          disabled={isSubmitting}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
            ${errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-slate-900'
            }`}
          placeholder="Ej: Electrónica"
        />
        {errors.name && (
          <p className="text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Descripción
        </label>
        <textarea
          {...register('description')}
          disabled={isSubmitting}
          rows={3}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
            ${errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-slate-900'
            }`}
        />
        {errors.description && (
          <p className="text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {isSubmitting
            ? 'Guardando...'
            : isEdit
              ? 'Actualizar categoría'
              : 'Crear categoría'}
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => router.push('/admin/categories')}
          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>

    </form>
  );
}

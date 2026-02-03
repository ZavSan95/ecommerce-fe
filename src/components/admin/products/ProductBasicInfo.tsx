import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProductFormData } from '@/schemas/product.schema';
import { Category } from '@/interfaces/categories.interface';

interface Props {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  categories: Category[];
  isSubmitting: boolean;
}

export function ProductBasicInfo({
  register,
  errors,
  categories,
  isSubmitting,
}: Props) {
  return (
    <section className="space-y-4">

      <h2 className="text-lg font-semibold">
        Información del producto
      </h2>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Nombre
        </label>
        <input
          {...register('name')}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Samsung Galaxy S27"
        />
        {errors.name && (
          <p className="text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          {...register('description')}
          rows={3}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Smartphone gama alta Samsung"
        />
        {errors.description && (
          <p className="text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Categoría */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Categoría
        </label>
        <select
          {...register('categoryId')}
          disabled={isSubmitting || categories.length === 0}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">
            {categories.length === 0
              ? 'Cargando categorías...'
              : 'Seleccionar categoría'}
          </option>

          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="text-xs text-red-600">
            {errors.categoryId.message}
          </p>
        )}
      </div>

    </section>
  );
}

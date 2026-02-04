'use client';

import { useFormContext } from 'react-hook-form';
import { ProductFormData } from '@/schemas/product.schema';

interface Props {
  index: number;
}

export function VariantAttributes({ index }: Props) {
  const { register } = useFormContext<ProductFormData>();

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-slate-700">
        Atributos
      </h4>

      <div className="grid grid-cols-2 gap-3">
        <input
          {...register(`variants.${index}.attributes.color`)}
          placeholder="Color (ej: Negro)"
          className="rounded-lg border px-3 py-2 text-sm"
        />

        <input
          {...register(`variants.${index}.attributes.memoria`)}
          placeholder="Memoria (ej: 256GB)"
          className="rounded-lg border px-3 py-2 text-sm"
        />

      </div>
    </div>
  );
}

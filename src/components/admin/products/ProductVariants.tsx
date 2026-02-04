'use client';

import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  Control,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { ProductFormData } from '@/schemas/product.schema';
import { ProductVariantItem } from './ProductVariantItem';

interface Props {
  control: Control<ProductFormData>;
  fields: FieldArrayWithId<ProductFormData, 'variants', 'id'>[];
  append: UseFieldArrayAppend<ProductFormData, 'variants'>;
  remove: (index: number) => void;
  isSubmitting: boolean;
}

export function ProductVariants({
  fields,
  append,
  remove,
  isSubmitting,
}: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Variantes</h2>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() =>
            append({
              sku: '',
              price: 0,
              stock: 0,
              images: [],
              imageFiles: [],
              imagesToRemove: [],
              isDefault: fields.length === 0,
              isNew: true,
            })
          }
          className="text-sm underline text-slate-700 disabled:opacity-50"
        >
          + Agregar variante
        </button>
      </div>

      {fields.map((field, index) => (
        <ProductVariantItem
          key={field.id}
          index={index}
          isSubmitting={isSubmitting}
          isNew={field.isNew}
          onRemove={() => {
            if (fields.length === 1) {
              toast.error('El producto debe tener al menos una variante');
              return;
            }

            remove(index);
          }}
        />
      ))}
    </section>
  );
}

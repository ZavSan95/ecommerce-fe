'use client';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { ProductFormData } from '@/schemas/product.schema';
import { VariantImagesUploader } from './VariantImagesUploader';

interface Props {
  index: number;
  isSubmitting: boolean;
}

export function ProductVariantItem({
  index,
  isSubmitting,
}: Props) {
  const { register, setValue, watch } =
    useFormContext<ProductFormData>();

  const images = watch(`variants.${index}.images`) ?? [];

  // 👉 estado LOCAL solo para archivos (no van a RHF directamente)
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <div className="rounded-xl border border-slate-200 p-5 space-y-4 bg-slate-50">

      {/* SKU */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          SKU
        </label>
        <input
          {...register(`variants.${index}.sku`)}
          disabled={isSubmitting}
          placeholder="SKU-123"
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      {/* Precio + Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Precio
          </label>
          <input
            type="number"
            {...register(`variants.${index}.price`, {
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Stock
          </label>
          <input
            type="number"
            {...register(`variants.${index}.stock`, {
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Imágenes */}
      <VariantImagesUploader
        name={`variants.${index}.imageFiles`}
        imagesName={`variants.${index}.images`}
      />


      {/* 👇 puente RHF → submit (opción B) */}
      <input
        type="hidden"
        {...register(`variants.${index}.imageFiles` as any)}
      />
    </div>
  );
}

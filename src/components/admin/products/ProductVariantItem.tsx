'use client';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { ProductFormData } from '@/schemas/product.schema';
import { VariantImagesUploader } from './VariantImagesUploader';
import { VariantAttributes } from './VariantAttributes';
import { ConfirmDialog } from '@/components';

interface Props {
  index: number;
  isSubmitting: boolean;
  onRemove: () => void;
  isNew?: boolean;
}

export function ProductVariantItem({
  index,
  isSubmitting,
  onRemove,
  isNew,
}: Props) {
  const { register, setValue, watch } =
    useFormContext<ProductFormData>();

  const isDefault = watch(`variants.${index}.isDefault`);
  const sku = watch(`variants.${index}.sku`);

  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <div className="relative rounded-xl border border-slate-200 p-5 space-y-4 bg-slate-50">

        {/* ❌ Quitar / Eliminar variante */}
        {!isDefault && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setConfirmOpen(true)}
            className="absolute top-3 right-3 text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            {isNew ? 'Quitar' : 'Eliminar'}
          </button>
        )}

        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="defaultVariant"
            checked={isDefault}
            disabled={isSubmitting}
            onChange={() => {
              // 1️⃣ poner todas en false
              const variants = watch('variants') ?? [];
              variants.forEach((_, i) => {
                setValue(`variants.${i}.isDefault`, false, {
                  shouldDirty: true,
                });
              });

              // 2️⃣ marcar esta como default
              setValue(`variants.${index}.isDefault`, true, {
                shouldDirty: true,
              });
            }}
          />

          <label className="text-sm font-medium text-slate-700">
            Variante por defecto
          </label>
        </div>


        {/* SKU */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            SKU
          </label>
          <input
            {...register(`variants.${index}.sku`)}
            disabled
            className="w-full rounded-lg border px-3 py-2 text-sm bg-slate-100"
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

        {/* Atributos */}
        <VariantAttributes index={index} />

        {/* Imágenes */}
        <VariantImagesUploader
          name={`variants.${index}.imageFiles`}
          imagesName={`variants.${index}.images`}
        />

        {/* puente RHF → submit */}
        {/* <input
          type="hidden"
          {...register(`variants.${index}.imageFiles` as any)}
        /> */}
      </div>

      {/* 🧠 ConfirmDialog */}
      <ConfirmDialog
        open={confirmOpen}
        title={isNew ? 'Quitar variante' : 'Eliminar variante'}
        description={`¿Seguro que querés ${
          isNew ? 'quitar' : 'eliminar'
        } la variante "${sku}"?`}
        confirmText={isNew ? 'Quitar' : 'Eliminar'}
        cancelText="Cancelar"
        onConfirm={() => {
          onRemove();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

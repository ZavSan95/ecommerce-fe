'use client';

import { useState } from 'react';
import { VariantImagesUploader } from './VariantImagesUploader';

interface VariantForm {
  sku: string;
  price: number;
  stock: number;
  images: string[];
  isDefault: boolean;
}

export function ProductForm() {
  const [variants, setVariants] = useState<VariantForm[]>([
    {
      sku: '',
      price: 0,
      stock: 0,
      images: [],
      isDefault: true,
    },
  ]);

  const addVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        sku: '',
        price: 0,
        stock: 0,
        images: [],
        isDefault: false,
      },
    ]);
  };

  const updateVariant = (
    index: number,
    field: keyof VariantForm,
    value: any
  ) => {
    setVariants(prev =>
      prev.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      )
    );
  };

  const setDefaultVariant = (index: number) => {
    setVariants(prev =>
      prev.map((v, i) => ({
        ...v,
        isDefault: i === index,
      }))
    );
  };

  return (
    <form className="space-y-8">

      {/* ===================== */}
      {/* Información básica */}
      {/* ===================== */}
      <section className="space-y-4">

        <h2 className="text-lg font-semibold">
          Información del producto
        </h2>

        {/* Nombre */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Samsung Galaxy S27"
          />
        </div>

        {/* Descripción */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Smartphone gama alta Samsung"
          />
        </div>

        {/* Categoría */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Categoría
          </label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">Seleccionar categoría</option>
            {/* map categorías */}
          </select>
        </div>

        {/* Estado */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Estado
          </label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>

      </section>

      <div className="border-t pt-6" />

      {/* ===================== */}
      {/* Variantes */}
      {/* ===================== */}
      <section className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Variantes
          </h2>

          <button
            type="button"
            onClick={addVariant}
            className="text-sm underline text-slate-700"
          >
            + Agregar variante
          </button>
        </div>

        {variants.map((variant, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-5 space-y-4 bg-slate-50"
          >

            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Variante #{index + 1}
              </h3>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={variant.isDefault}
                  onChange={() => setDefaultVariant(index)}
                />
                Default
              </label>
            </div>

            {/* SKU */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                SKU
              </label>
              <input
                value={variant.sku}
                onChange={e =>
                  updateVariant(index, 'sku', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="S27-128"
              />
            </div>

            {/* Precio / Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Precio
                </label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={e =>
                    updateVariant(index, 'price', Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={e =>
                    updateVariant(index, 'stock', Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Imágenes */}
            <VariantImagesUploader
              images={variant.images}
              onChange={imgs =>
                updateVariant(index, 'images', imgs)
              }
            />

          </div>
        ))}

      </section>

      {/* ===================== */}
      {/* Actions */}
      {/* ===================== */}
      <div className="flex items-center gap-2 pt-4">

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          Crear producto
        </button>

        <button
          type="button"
          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
        >
          Cancelar
        </button>

      </div>

    </form>
  );
}

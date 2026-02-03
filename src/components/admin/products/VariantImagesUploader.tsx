'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoImageOutline, IoCloseOutline } from 'react-icons/io5';
import { ProductFormData } from '@/schemas/product.schema';

interface Props {
  name: `variants.${number}.imageFiles`;
  imagesName: `variants.${number}.images`;
}

export function VariantImagesUploader({ name, imagesName }: Props) {
  const { setValue, watch } = useFormContext<ProductFormData>();

  /* ========================= */
  /* Existing images (backend) */
  /* ========================= */
  const images = watch(imagesName) ?? [];

  /* ========================= */
  /* New files (frontend)      */
  /* ========================= */
  const filesRaw = watch(name);

  const files: File[] = Array.isArray(filesRaw)
    ? filesRaw.filter(f => f instanceof File)
    : [];

  const previews = files.map(file => ({
    id: file.name + file.size,
    url: URL.createObjectURL(file),
  }));

  /* ========================= */
  /* Cleanup previews          */
  /* ========================= */
  useEffect(() => {
    return () => previews.forEach(p => URL.revokeObjectURL(p.url));
  }, [previews]);

  /* ========================= */
  /* Handlers                  */
  /* ========================= */
  const handleFiles = (list: FileList | null) => {
    if (!list) return;

    setValue(name, [...files, ...Array.from(list)], {
      shouldDirty: true,
    });
  };

  /* ========================= */
  /* Render                    */
  /* ========================= */
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Imágenes</label>

      {/* Upload */}
      <label className="flex items-center gap-2 px-3 py-2 border border-dashed rounded-lg cursor-pointer">
        <IoImageOutline />
        Agregar imágenes
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {/* ========================= */}
        {/* Existing images           */}
        {/* ========================= */}
        {images.map(img => {
          const imagesToRemoveName =
            imagesName.replace('.images', '.imagesToRemove') as
              `variants.${number}.imagesToRemove`;

          return (
            <div
              key={img}
              className="relative aspect-square border rounded overflow-hidden"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/uploads/${img}?v=${Date.now()}`}
                className="object-cover w-full h-full"
                alt="Imagen del producto"
              />

              <button
                type="button"
                onClick={() => {
                  // 1️⃣ quitar visualmente
                  setValue(
                    imagesName,
                    images.filter(i => i !== img),
                    { shouldDirty: true }
                  );

                  // 2️⃣ marcar para borrar en submit
                  const toRemove = watch(imagesToRemoveName) ?? [];

                  setValue(
                    imagesToRemoveName,
                    [...toRemove, img],
                    { shouldDirty: true }
                  );
                }}
                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
              >
                <IoCloseOutline size={14} />
              </button>
            </div>
          );
        })}

        {/* ========================= */}
        {/* New previews              */}
        {/* ========================= */}
        {previews.map(p => (
          <div
            key={p.id}
            className="relative aspect-square border rounded overflow-hidden"
          >
            <img
              src={p.url}
              className="object-cover w-full h-full"
              alt="Preview"
            />

            <button
              type="button"
              onClick={() =>
                setValue(
                  name,
                  files.filter(f => f.name + f.size !== p.id),
                  { shouldDirty: true }
                )
              }
              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
            >
              <IoCloseOutline size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

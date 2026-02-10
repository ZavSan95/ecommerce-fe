'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoImageOutline, IoCloseOutline } from 'react-icons/io5';
import { ProductFormData } from '@/schemas/product.schema';
import { getProductImageUrl } from '@/utils/image';
import { FileWithPreview } from '@/interfaces/file-with-preview';


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
  const files: FileWithPreview[] = watch(name) ?? [];

  /* ========================= */
  /* Handlers                  */
  /* ========================= */
  const handleFiles = (list: FileList | null) => {
    if (!list) return;

      const newFiles: FileWithPreview[] = Array.from(list).map(
        file => ({
          file,
          preview: URL.createObjectURL(file),
        }),
      );

      setValue(name, [...files, ...newFiles], {
        shouldDirty: true,
      });
  };

  const removeFile = (preview: string) => {
    const file = files.find(f => f.preview === preview);
    if (file) {
      URL.revokeObjectURL(file.preview);
    }

    setValue(
      name,
      files.filter(f => f.preview !== preview),
      { shouldDirty: true },
    );
  };

  /* ========================= */
  /* Cleanup on unmount        */
  /* ========================= */
  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.preview));
    };
  }, []);

  /* ========================= */
  /* Render                    */
  /* ========================= */
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Imágenes
      </label>

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
                src={getProductImageUrl(img)}
                className="object-cover w-full h-full"
                alt="Imagen del producto"
              />

              <button
                type="button"
                onClick={() => {
                  setValue(
                    imagesName,
                    images.filter(i => i !== img),
                    { shouldDirty: true },
                  );

                  const toRemove =
                    watch(imagesToRemoveName) ?? [];

                  setValue(
                    imagesToRemoveName,
                    [...toRemove, img],
                    { shouldDirty: true },
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
        {files.map(f => (
          <div
            key={f.preview}
            className="relative aspect-square border rounded overflow-hidden"
          >
            <img
              src={f.preview}
              className="object-cover w-full h-full"
              alt="Preview"
            />

            <button
              type="button"
              onClick={() => removeFile(f.preview)}
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

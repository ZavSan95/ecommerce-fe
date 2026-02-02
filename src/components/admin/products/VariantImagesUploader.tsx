'use client';

import { useState } from 'react';
import { IoImageOutline, IoCloseOutline } from 'react-icons/io5';

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export function VariantImagesUploader({ images, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);

    // ⚠️ MOCK: después esto será upload real
    const uploadedUrls = Array.from(files).map(
      (_, i) => `products/mock-image-${Date.now()}-${i}.jpg`
    );

    onChange([...images, ...uploadedUrls]);
    setIsUploading(false);
  };

  const removeImage = (url: string) => {
    onChange(images.filter(img => img !== url));
  };

  return (
    <div className="space-y-3">

      <label className="block text-sm font-medium text-slate-700">
        Imágenes
      </label>

      {/* Upload */}
      <label className="flex items-center gap-2 px-3 py-2 border border-dashed rounded-lg cursor-pointer hover:bg-slate-50 text-sm text-slate-600">
        <IoImageOutline size={18} />
        {isUploading ? 'Subiendo...' : 'Agregar imágenes'}
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </label>

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map(img => (
            <div
              key={img}
              className="relative aspect-square rounded-lg border overflow-hidden bg-slate-100"
            >
              <img
                src={`/uploads/${img}`}
                alt=""
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
              >
                <IoCloseOutline size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import { endpoints } from '@/config/api';

export interface UploadedImage {
  key: string;
  url: string;
}

export default async function uploadImages(
  url: string,
  files: File[]
): Promise<UploadedImage[]> {

  const formData = new FormData();

  files.forEach(file => {
    formData.append('images', file);
  });

  const res = await fetch(endpoints.uploadImages(url), {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Error al subir imágenes');
  }

  const data = await res.json();

  return data.files as UploadedImage[];
}

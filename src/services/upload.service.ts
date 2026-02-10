import { endpoints } from '@/config/api';

export interface PresignedUpload {
  key: string;
  uploadUrl: string;
  viewUrl: string;
}

/**
 * Pide al backend URLs firmadas para subir imágenes a Wasabi
 */
export async function getPresignedUploads(
  count: number
): Promise<PresignedUpload[]> {
  const res = await fetch(endpoints.presignedUploads(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ count }),
  });

  if (!res.ok) {
    throw new Error('Error generando URLs de subida');
  }

  const data = await res.json();
  return data.uploads as PresignedUpload[];
}

/**
 * Sube un archivo directamente a Wasabi usando PUT
 */
export async function uploadFileToWasabi(
  uploadUrl: string,
  file: File
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/webp',
    },
    credentials: 'include',
    body: file,
  });

  if (!res.ok) {
    throw new Error('Error subiendo archivo a Wasabi');
  }
}

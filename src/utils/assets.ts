export const getProductImageUrl = (key?: string) => {
  if (!key) return '/placeholder.webp';

  // Si ya es URL absoluta, usarla
  if (key.startsWith('http')) {
    return key;
  }

  // Limpiar cualquier prefijo incorrecto
  const cleanKey = key
    .replace(/^\/+/, '')
    .replace(/^products\//, '')
    .replace(/^uploads\//, '')
    .replace(/^uploads\/products\//, '');

  return `http://localhost:3000/uploads/products/${cleanKey}`;
};
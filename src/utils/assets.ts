export const getProductImageUrl = (key?: string) => {
  if (!key) return '/placeholder.webp';

  // Si no empieza con products/, forzar placeholder
  if (!key.startsWith('products/')) {
    return '/placeholder.webp';
  }

  return `http://localhost:3000/uploads/${key}`;
};

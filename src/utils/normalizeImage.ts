export default function normalizeImage(src?: string) {
  if (!src) return undefined;

  // ya es absoluta
  if (src.startsWith('http')) return src;

  // ya tiene slash
  if (src.startsWith('/')) return src;

  // viene como "products/xxx.jpg"
  return `http://localhost:3000/uploads/${src}`;
}
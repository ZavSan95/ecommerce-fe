export function getProductImageUrl(key?: string) {
  if (!key) return '/placeholder.webp';

  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${key}`;
}

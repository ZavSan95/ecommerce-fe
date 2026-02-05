import { endpoints } from '@/config/api';
import { Product } from '@/interfaces';

export const searchProducts = async (
  query: string,
): Promise<Product[]> => {
  if (!query || query.trim().length < 2) return [];

  const res = await fetch(
    endpoints.searchProducts(query),
    {
      cache: 'no-store',
      credentials: 'include', 
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
};

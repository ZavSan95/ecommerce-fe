import { PaginatedResponse } from '@/interfaces/pagination.interface';
import { endpoints } from '@/config/api';
import { Favorite } from '@/interfaces/favorite.interface';

type GetMyFavoritesParams = {
  page?: number;
  limit?: number;
};

/* ============================
   GET MY FAVORITES
============================ */
export async function getMyFavorites(
  params: GetMyFavoritesParams = {},
): Promise<PaginatedResponse<Favorite>> {

  const { page = 1, limit = 10 } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(
    `${endpoints.favorites()}?${query.toString()}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('No se pudieron obtener los favoritos');
  }

  return res.json();
}

export const toggleFavorite = async (payload: {
  productId: string;
  sku: string;
}) => {
  const res = await fetch(`${endpoints.favorites()}/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error toggling favorite');
  }

  return res.json() as Promise<{
    isFavorite: boolean;
    favoriteId: string | null;
  }>;
};

import { PaginatedResponse } from '@/interfaces/pagination.interface';
import { endpoints } from '@/config/api';
import { Favorite } from '@/interfaces/favorite.interface';

type GetMyFavoritesParams = {
  page?: number;
  limit?: number;
};

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

export async function addFavorite(){
  
}

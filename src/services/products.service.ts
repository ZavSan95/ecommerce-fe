import { endpoints } from '@/config/api';
import { Product } from '@/interfaces';
import { PaginatedResponse } from '@/interfaces/pagination.interface';

type FetchProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export async function getProducts(
    params: FetchProductsParams = {}
): Promise<PaginatedResponse<Product>> {
  try {

  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);

  const res = await fetch(
    `${endpoints.products}?${query.toString()}`,
    { cache: 'no-store' }
  );

  return res.json();

  } catch (error) {
    throw new Error('Error al obtener categorías');
  }
}

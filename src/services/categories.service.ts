import { endpoints } from '@/config/api';
import { Category } from '@/interfaces/categories.interface';
import { PaginatedResponse } from '@/interfaces/pagination.interface';
import { CategoryFormData } from '@/schemas/new-category.schema';
import { notFound } from 'next/navigation';

type FetchCategoriesParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export async function fetchCategories(
  params: FetchCategoriesParams = {}
): Promise<PaginatedResponse<Category>> {

  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);

  const res = await fetch(
    `${endpoints.categories}?${query.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Error al obtener categorías');
  }

  return res.json();
}

type NewCategory = {
  name: string;
  description?: string;
}

export async function createCategory(
  payload: NewCategory
){
  const res = await fetch(endpoints.categories, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error creando categoría');
  }

  return res.json();
}

export async function updateCategory(
  id: string,
  payload: CategoryFormData
) {
  const res = await fetch(
    endpoints.update_category(id),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error('Error actualizando categoría');
  }

  return res.json();
}

export async function getCategoryById(id: string) {
  const res = await fetch(
    endpoints.categoryById(id),
    {
      cache: 'no-store',
      credentials: 'include',
    }
  );

  if (res.status === 404) {
    notFound(); // 👈 CLAVE
  }

  if (!res.ok) {
    throw new Error('Error al obtener la categoría');
  }

  return res.json();
}

export async function deleteCategory(id: string){
  const res = await fetch(
    endpoints.delete_category(id),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }
  );

  if (!res.ok) {
    throw new Error('Error al eliminar categoría');
  }

  return res.json();
}

export async function toggleStatusCategory(id: string){

  const res = await fetch(
    endpoints.toggle_status_category(id),
    {
      method: 'PATCH',
      credentials: 'include',
    }
  );

  if(!res.ok){
    throw new Error('Error al cambiar estado');
  }

  return res.json();

}


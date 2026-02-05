import { endpoints } from '@/config/api';
import { Product } from '@/interfaces';
import { PaginatedResponse, PaginationMeta } from '@/interfaces/pagination.interface';
import { ProductDetail } from '@/interfaces/product-detail.interface';

type FetchProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export interface BackendVariant {
  sku: string;
  price: number;
  stock: number;
  images: string[];
  isDefault: boolean;
}

export interface BackendProduct {
  name: string;
  description?: string;
  category: string;
  variants: BackendVariant[];
}


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

    if (!res.ok) throw new Error();
    if (!res.headers.get('content-type')?.includes('application/json')) {
      throw new Error();
    }

    return await res.json();

  } catch {
    return {
      data: [],
      meta: {} as PaginationMeta,
    };
  }
}

export async function getRelatedProducts(slug: string): Promise<ProductDetail | null>{

  const res = await fetch(endpoints.relatedProducts(slug), {
    method: 'GET',
    cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function createProduct(payload: Partial<Product>){
  
  const res = await fetch(endpoints.products, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error al crear producto');
  }

  return res.json();
}

export async function getProductById(id: string):Promise<BackendProduct>{
  const res = await fetch(endpoints.productById(id), {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store', 
    headers: { 'Cache-Control': 'no-cache' },
  });

  if (!res.ok) {
    throw new Error('Error al actualizar producto');
  }

  return res.json();
}

export async function updateProduct(id: string, payload: any) {
  const res = await fetch(endpoints.uploadProducts(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error al actualizar producto');
  }

  return res.json();
}

export async function deleteProductImage(filename: string) {
  const res = await fetch(
    endpoints.deleteProductImages(filename),
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Error al eliminar imagen');
  }

  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(
    endpoints.deleteProducts(id),
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Error al eliminar producto');
  }

  return res.json();
}




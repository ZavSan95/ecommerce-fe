import { Category } from '@/interfaces/categories.interface';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch('http://localhost:3000/api/categories', {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];

  } catch {
    return [];
  }
}

// src/services/orders.server.ts
import { cookies } from 'next/headers';
import { endpoints } from '@/config/api';
import { OrderDetail } from '@/interfaces/order-detail';

export async function getOrderById(
  id: string
): Promise<OrderDetail | null> {

  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(endpoints.orderById(id), {
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  if (res.status === 401 || res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Error al obtener la orden');
  }

  return res.json();
}

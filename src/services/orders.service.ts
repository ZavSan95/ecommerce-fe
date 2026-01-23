import { endpoints } from '@/config/api';
import { Order } from '@/interfaces/orders.interface';

export async function getMyOrders(): Promise<Order[]> {
  const res = await fetch(endpoints.my_orders(), {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('No se pudieron cargar las órdenes');
  }

  return res.json(); // 👈 Order[]
}

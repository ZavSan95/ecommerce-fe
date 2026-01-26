'use client';

import { useEffect, useState } from 'react';
import { Title } from '@/components';
import { OrdersGrid } from '@/components/orders/OrdersGrid';
import { getMyOrders } from '@/services/orders.client';
import { Spinner } from '@/components/ui/spiner/Spiner';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Order } from '@/interfaces/orders.interface';

export default function OrdersPage() {

  const { isAuthenticated, isChecking } = useAuthGuard('/orders', 600);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    getMyOrders()
      .then(data => {
        setOrders(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated]);

  if (isChecking || loading) {
    return <Spinner label="Cargando órdenes..." />;
  }

  if (!isAuthenticated) {
    return null;
  }
  
  console.log(orders);

  return (
    <>
      <Title title="Órdenes" />
      <OrdersGrid orders={orders} />
    </>
  );
}

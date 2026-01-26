import { endpoints } from '@/config/api';
import { PaymentProvider } from '@/enum/payments-providers';
import { OrderDetail } from '@/interfaces/order-detail';
import { Order } from '@/interfaces/orders.interface';
import { cookies } from 'next/headers';


export async function getMyOrders(): Promise<Order[]> {
  const res = await fetch(endpoints.my_orders(), {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('No se pudieron cargar las órdenes');
  }

  return res.json();
}

export interface CreateOrderPayload {
  items: { productId: string; sku: string; quantity: number }[];

  billingAddress: {
    fullName: string;
    phone: string;
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  shippingAddress: CreateOrderPayload['billingAddress'];

  paymentProvider: PaymentProvider;
}

export interface CheckoutResponse {
  orderId: string;
  orderNumber: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  currency: string;
  totals: {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
  };
  payment: {
    provider: string;
    status: string;
    amount: number;
    checkoutUrl?: string;
    providerPaymentId?: string;
  };
  expiresAt?: string;
}

export async function createOrder(payload: CreateOrderPayload): Promise<CheckoutResponse> {
  const res = await fetch(endpoints.orders_checkout(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? 'No se pudo crear la orden');
  }

  return res.json();
}

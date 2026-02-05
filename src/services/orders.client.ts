import { endpoints } from '@/config/api';
import { PaymentProvider } from '@/enum/payments-providers';
import { OrderApiResponse } from '@/interfaces/order-api-response.interface';
import { Order } from '@/interfaces/orders.interface';
import { PaginatedResponse } from '@/interfaces/pagination.interface';

export async function getMyOrders(): Promise<Order[]> {
  try {
    const res = await fetch(endpoints.my_orders(), {
      credentials: 'include',
    });

    // 🔐 Usuario no autenticado / sesión vencida
    if (res.status === 401 || res.status === 403) {
      return [];
    }

    // ⚠️ Otro error backend
    if (!res.ok) {
      console.warn(
        'Error al cargar órdenes:',
        res.status,
        res.statusText,
      );
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error de red al cargar órdenes', error);
    return [];
  }
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

type GetOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export async function getOrders(
  params: GetOrdersParams = {}
): Promise<PaginatedResponse<OrderApiResponse>> {
  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);

  const res = await fetch(endpoints.orders, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener órdenes');
  }

  return res.json();
}
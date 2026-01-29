export interface OrderRow {
  id: string;
  orderNumber: string;
  status: 'pending_payment' | 'paid' | 'cancelled';

  paymentStatus: 'pending' | 'paid' | 'failed' | '—';
  paymentProvider: 'mercadopago' | '—';

  totalAmount: number;
  currency: string;
  createdAt: string;
}

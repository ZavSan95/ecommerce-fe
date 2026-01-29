export interface OrderApiResponse {
  id: string;
  orderNumber: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  currency: string;
  totalAmount: string;
  createdAt: string;

  payments: {
    provider: 'mercadopago';
    status: 'pending' | 'paid' | 'failed';
    amount: string;
  }[];
}

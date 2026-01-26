export interface OrderPayment {
  id: string;
  orderId: string;

  provider: 'mercadopago';
  providerPaymentId: string;
  status: 'pending' | 'paid' | 'failed';

  amount: string;
  createdAt: string;
}

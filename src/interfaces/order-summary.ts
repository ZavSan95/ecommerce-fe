export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  totalAmount: number;
  currency: string;
  createdAt: string;
}

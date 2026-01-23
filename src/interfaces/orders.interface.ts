export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  customerName: string;
}
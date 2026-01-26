export interface OrderDetail {
  id: string;
  orderNumber: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  currency: string;

  subtotalAmount: string;
  discountAmount: string;
  taxAmount: string;
  shippingAmount: string;
  totalAmount: string;

  customerId: string | null;
  customerEmail: string;
  customerName: string;

  createdAt: string;
  updatedAt: string;

  items: OrderItem[];
  payments: OrderPayment[];
}

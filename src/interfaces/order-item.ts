export interface OrderItem {
  id: string;
  orderId: string;

  productId: string;
  variantId: string | null;

  productName: string;
  variantName: string | null;

  sku: string;
  unitPrice: string;
  quantity: number;
  totalPrice: string;
}

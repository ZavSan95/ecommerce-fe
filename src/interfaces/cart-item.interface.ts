export interface CartItem {
  productId: string;
  productName: string;

  variantSku: string;

  price: number;
  quantity: number;
  stock: number;

  attributes?: Record<string, string>;
  image?: string;
}

export interface ProductVariant {
  sku: string;
  price: number;
  stock: number;
  images?: string[];
  attributes?: Record<string, string>;
  isDefault?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  categoryId: string;
  variants: ProductVariant[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

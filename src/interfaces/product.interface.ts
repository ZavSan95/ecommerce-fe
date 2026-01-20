export interface ProductVariant {
  sku: string;
  price: number;
  stock: number;
  images: string[];
  attributes: Record<string, string>;
  isDefault: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  variants: ProductVariant[];
}

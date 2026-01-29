export interface Variant {
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  images: string[];
  isDefault: boolean;
}

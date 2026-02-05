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

  categoryId: string | PopulatedCategory;

  variants: ProductVariant[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedCategory {
  _id: string;
  name: string;
}

interface ProductWithSuggestions extends Product {
  relatedType: 'variants' | 'products';
  related?: Product[];
}
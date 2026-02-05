import { Product } from './product.interface';

export interface ProductDetail extends Product {
  relatedType: 'variants' | 'products';
  related?: Product[];
}

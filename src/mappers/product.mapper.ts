import { BackendProduct } from '@/services/products.service';
import { ProductFormData } from '@/schemas/product.schema';

export function mapBackendProductToForm(
  product: BackendProduct
): ProductFormData {
  return {
    name: product.name,
    description: product.description ?? '',
    categoryId: product.category, 
    variants: product.variants.map(v => ({
      sku: v.sku,
      price: v.price,
      stock: v.stock,
      isDefault: v.isDefault,
      images: v.images ?? [],
    })),
  };
}

'use client';

import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/cart/cartSlice';
import { Product, ProductVariant } from '@/interfaces/product.interface';
import { CartItem } from '@/interfaces/cart-item.interface';

export function useAddToCart() {
  const dispatch = useAppDispatch();

  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity = 1
  ) => {
    if (variant.stock === 0) return;

    const item: CartItem = {
      productId: product._id,
      productName: product.name,

      variantSku: variant.sku,

      price: variant.price,
      quantity,
      stock: variant.stock,

      attributes: variant.attributes,

      // ✅ SOLO la key
      image: variant.images?.[0], // "products/uuid.webp"
    };

    dispatch(addItem(item));
  };

  return { addToCart };
}

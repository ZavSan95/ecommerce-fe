'use client';

import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/cart/cartSlice';
import { Product, ProductVariant } from '@/interfaces/product.interface';
import { CartItem } from '@/interfaces/cart-item.interface';
import { getProductImageUrl } from '@/utils/assets';

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
      image: variant.images?.[0]
        ? getProductImageUrl(variant.images[0])
        : undefined,
    };

    dispatch(addItem(item));
  };

  return { addToCart };
}

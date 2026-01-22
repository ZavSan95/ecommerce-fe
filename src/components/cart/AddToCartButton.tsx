'use client';

import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/cart/cartSlice';
import { CartItem } from '@/interfaces/cart-item.interface';
import { Product, ProductVariant } from '@/interfaces/product.interface';
import { getProductImageUrl } from '@/utils/assets';

interface Props {
  product: Product;
  variant: ProductVariant;
}

export const AddToCartButton = ({ product, variant }: Props) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const item: CartItem = {
      productId: product._id,
      productName: product.name,

      variantSku: variant.sku,

      price: variant.price,
      quantity: 1,
      stock: variant.stock,

      attributes: variant.attributes,
      image: variant.images?.[0]
        ? getProductImageUrl(variant.images[0])
        : undefined,
    };

    dispatch(addItem(item));
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn-primary my-5 w-full"
      disabled={variant.stock === 0}
    >
      {variant.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
    </button>
  );
};

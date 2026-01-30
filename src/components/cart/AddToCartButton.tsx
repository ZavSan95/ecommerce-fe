'use client';

import { Product, ProductVariant } from '@/interfaces/product.interface';
import { useAddToCart } from '@/hooks/useAddToCart';
import { FiShoppingCart } from 'react-icons/fi';

interface Props {
  product: Product;
  variant: ProductVariant;
}

export const AddToCartButton = ({ product, variant }: Props) => {
  const { addToCart } = useAddToCart();

  return (
    <button
      onClick={() => addToCart(product, variant)}
      disabled={variant.stock === 0}
      className="
        flex items-center gap-2
        text-sm font-medium
        text-slate-900
        hover:text-black
        transition
        disabled:opacity-40
      "
    >
      <FiShoppingCart size={18} />
      {variant.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
    </button>
  );
};

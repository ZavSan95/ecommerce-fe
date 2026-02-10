'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/interfaces';
import { getProductImageUrl } from '@/utils/image';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useAddToCart } from '@/hooks/useAddToCart';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite?: (
    productId: string,
    sku: string,
  ) => Promise<void>;
}

export const ProductGridItem = ({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { addToCart } = useAddToCart();

  const variant =
    product.variants.find(v => v.isDefault) ??
    product.variants[0];

  const images = variant.images ?? [];

  // 👇 SOLO índice, no URL
  const [imageIndex, setImageIndex] = useState(0);

  const imageKey = images[imageIndex];
  const imageUrl = imageKey
    ? getProductImageUrl(imageKey)
    : '/placeholder.webp';

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onToggleFavorite) return;

    if (!isAuthenticated) {
      toast.error('Tenés que iniciar sesión para usar favoritos');
      router.push(`/auth/login?redirect=/product/${variant.sku}`);
      return;
    }

    try {
      await onToggleFavorite(product._id, variant.sku);
      toast.success(
        isFavorite
          ? 'Eliminado de favoritos 💔'
          : 'Agregado a favoritos ❤️',
      );
    } catch {
      toast.error('No se pudo actualizar favoritos');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, variant);
    toast.success('Producto agregado al carrito');
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">

      <Link href={`/product/${variant.sku}`}>
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
            onMouseEnter={() => images[1] && setImageIndex(1)}
            onMouseLeave={() => setImageIndex(0)}
          />
        </div>
      </Link>

      {/* Overlay acciones */}
      <div className="absolute inset-0 flex items-end justify-center bg-black/0 group-hover:bg-black/10 transition pointer-events-none">
        <div className="mb-4 flex gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition pointer-events-auto">

          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-white shadow hover:bg-slate-100"
          >
            <FiShoppingCart size={18} />
          </button>

          <button
            onClick={handleToggleFavorite}
            className={`p-3 rounded-full shadow transition ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white hover:bg-slate-100'
            }`}
          >
            <FiHeart size={18} />
          </button>

        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <Link
          href={`/product/${variant.sku}`}
          className="font-medium hover:text-blue-600"
        >
          {product.name}
        </Link>

        <span className="font-bold text-lg">
          ${variant.price}
        </span>
      </div>
    </div>
  );
};

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/interfaces';
import { getProductImageUrl } from '@/utils/assets';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useAddToCart } from '@/hooks/useAddToCart';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const router = useRouter()
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const defaultVariant =
    product.variants.find(v => v.isDefault) ?? product.variants[0];

  const images = defaultVariant.images ?? [];

  const primaryImage = images[0]
    ? getProductImageUrl(images[0])
    : '/placeholder.webp';

  const secondaryImage = images[1]
    ? getProductImageUrl(images[1])
    : null;

  const [displayImage, setDisplayImage] = useState(primaryImage);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToCart } = useAddToCart();

  const handleAddToCart = () => {
      addToCart(product, defaultVariant);
      toast.success('Producto agregado al carrito');
  }

  
  const handleToggleFavorite = ( e: React.MouseEvent ) => {

    e.preventDefault();
    e.stopPropagation();

    if(!isAuthenticated){
      toast.error('Tenés que iniciar sesión para usar favoritos');
      router.push(
        `/auth/login?redirect=/product/${defaultVariant.sku}`
      );
      return;
    }

    setIsFavorite(prev => !prev);

  } 

  return (
    <div className="group relative rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">

      {/* Imagen */}
      <Link href={`/product/${defaultVariant.sku}`}>
        <Image
          src={displayImage}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-auto object-cover"
          onError={(e) => {
            (e.currentTarget as any).src = '/placeholder.webp';
          }}
          onMouseEnter={() =>
            secondaryImage && setDisplayImage(secondaryImage)
          }
          onMouseLeave={() => setDisplayImage(primaryImage)}
        />
      </Link>

      {/* Overlay acciones */}
      <div className="
        absolute inset-0
        flex items-end justify-center
        bg-black/0
        group-hover:bg-black/10
        transition
        pointer-events-none
      ">
        <div className="
          mb-4 flex gap-3
          opacity-0 translate-y-2
          group-hover:opacity-100 group-hover:translate-y-0
          transition
          pointer-events-auto
        ">
        <button
          onClick={handleAddToCart}
          className="p-3 rounded-full bg-white shadow hover:bg-slate-100"
          title="Agregar al carrito"
        >
          <FiShoppingCart size={18} />
        </button>

          <button
            onClick={handleToggleFavorite}
            className={`
              p-3 rounded-full shadow transition
              ${isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white hover:bg-slate-100'}
            `}
            title="Agregar a favoritos"
          >
            <FiHeart size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <Link
          href={`/product/${defaultVariant.sku}`}
          className="font-medium hover:text-blue-600"
        >
          {product.name}
        </Link>

        <span className="font-bold text-lg">
          ${defaultVariant.price}
        </span>
      </div>
    </div>
  );
};

'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi2';

import { Product, ProductVariant } from '@/interfaces/product.interface';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useAppSelector } from '@/store/hooks';
import {
  getMyFavorites,
  toggleFavorite,
} from '@/services/favorites.service';

interface Props {
  product: Product;
  variant: ProductVariant;
}

export const ProductActions = ({ product, variant }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { addToCart } = useAddToCart();

  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(true);
  const [toggling, setToggling] = useState(false);

  /* =========================================
     🔍 Al montar → verificar si es favorito
  ========================================= */
  useEffect(() => {
    if (!isAuthenticated) {
      setLoadingFav(false);
      return;
    }

    getMyFavorites({ limit: 100 })
      .then(res => {
        const exists = res.data.some(
          fav =>
            fav.productId === product._id &&
            fav.sku === variant.sku
        );

        setIsFavorite(exists);
      })
      .catch(() => {
        setIsFavorite(false);
      })
      .finally(() => setLoadingFav(false));
  }, [isAuthenticated, product._id, variant.sku]);

  /* =========================================
     🛒 Add to cart
  ========================================= */
  const handleAddToCart = () => {
    addToCart(product, variant);
    toast.success('Producto agregado al carrito');
  };

  /* =========================================
     ❤️ Toggle favorito (BACKEND SOURCE OF TRUTH)
  ========================================= */
  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Tenés que iniciar sesión para usar favoritos');
      router.push(`/auth/login?redirect=/product/${variant.sku}`);
      return;
    }

    if (toggling) return;
    setToggling(true);

    try {
      const res = await toggleFavorite({
        productId: product._id,
        sku: variant.sku,
      });

      setIsFavorite(res.isFavorite);

      toast.success(
        res.isFavorite
          ? 'Agregado a favoritos ❤️'
          : 'Eliminado de favoritos 💔'
      );
    } catch {
      toast.error('No se pudo actualizar favoritos');
    } finally {
      setToggling(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-1">

      {/* 🛒 Add to cart */}
      <button
        onClick={handleAddToCart}
        disabled={variant.stock === 0}
        className="
          group flex items-center gap-2
          rounded-full px-4 py-2
          bg-slate-100 text-sm font-medium text-slate-900
          hover:bg-slate-200 transition
          disabled:opacity-40
        "
      >
        <FiShoppingCart
          size={18}
          className="group-hover:scale-110 transition"
        />
        {variant.stock === 0 ? 'Sin stock' : 'Agregar'}
      </button>

      {/* ❤️ Favorito */}
      <button
        onClick={handleToggleFavorite}
        disabled={loadingFav || toggling}
        className="
          group flex items-center justify-center
          rounded-full p-2
          bg-slate-100 hover:bg-slate-200
          transition
          disabled:opacity-40
        "
        title="Favoritos"
      >
        {isFavorite ? (
          <HiHeart
            size={20}
            className="text-red-500 group-hover:scale-110 transition"
          />
        ) : (
          <FiHeart
            size={20}
            className="text-slate-500 group-hover:scale-110 transition"
          />
        )}
      </button>
    </div>
  );
};

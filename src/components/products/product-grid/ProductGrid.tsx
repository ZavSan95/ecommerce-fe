'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';
import { getMyFavorites, toggleFavorite } from '@/services/favorites.service';
import { useAppSelector } from '@/store/hooks';

type FavoriteMap = Record<string, string>;

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const [favoritesMap, setFavoritesMap] = useState<FavoriteMap>({});
  const [loading, setLoading] = useState(false);

  // 👉 Cargar favoritos SOLO si está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      setFavoritesMap({});
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await getMyFavorites({ limit: 100 });

        const map: FavoriteMap = {};
        res.data.forEach(fav => {
          map[`${fav.productId}|${fav.sku}`] = fav.id;
        });

        setFavoritesMap(map);
      } catch (error) {
        console.warn('No se pudieron cargar los favoritos', error);
        setFavoritesMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  // 👉 Toggle con guard de autenticación
  const handleToggleFavorite = async (
    productId: string,
    sku: string,
  ) => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/`);
      return;
    }

    const key = `${productId}|${sku}`;
    const res = await toggleFavorite({ productId, sku });

    setFavoritesMap(prev => {
      const copy = { ...prev };

      if (res.isFavorite && res.favoriteId) {
        copy[key] = res.favoriteId;
      } else {
        delete copy[key];
      }

      return copy;
    });
  };

  if (loading) return null;

  // 🔥 EXPANDIMOS VARIANTES
  const items = products.flatMap(product =>
    product.variants.map(variant => ({
      product,
      variant,
    })),
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {items.map(({ product, variant }) => {
        const key = `${product._id}|${variant.sku}`;

        return (
          <ProductGridItem
            key={key}
            product={{
              ...product,
              variants: [variant], // 👈 MUY IMPORTANTE
            }}
            isFavorite={isAuthenticated ? !!favoritesMap[key] : false}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      })}
    </div>
  );
};

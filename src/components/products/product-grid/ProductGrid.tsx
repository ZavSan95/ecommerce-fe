'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';
import { getMyFavorites, toggleFavorite } from '@/services/favorites.service';

type FavoriteMap = Record<string, string>;

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  const [favoritesMap, setFavoritesMap] = useState<FavoriteMap>({});
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const res = await getMyFavorites({ limit: 100 });
      const map: FavoriteMap = {};

      res.data.forEach(fav => {
        map[`${fav.productId}|${fav.sku}`] = fav.id;
      });

      setFavoritesMap(map);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (
    productId: string,
    sku: string,
  ) => {
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map(product => {
        const variant =
          product.variants.find(v => v.isDefault) ??
          product.variants[0];

        const key = `${product._id}|${variant.sku}`;

        return (
          <ProductGridItem
            key={key}
            product={product}
            isFavorite={!!favoritesMap[key]}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      })}
    </div>
  );
};

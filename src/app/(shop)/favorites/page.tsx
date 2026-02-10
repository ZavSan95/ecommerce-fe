'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import Link from 'next/link';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import { getMyFavorites, toggleFavorite } from '@/services/favorites.service';
import { FavoriteItem } from '@/interfaces/favorite-row.interface';
import { getProductImageUrl } from '@/utils/image';

export default function FavoritesPage() {
  const { isAuthenticated } = useAuthGuard('/favorites', 600);

  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    getMyFavorites()
      .then(res => {
        const mapped: FavoriteItem[] = res.data.map(fav => ({
          id: fav.id,
          productId: fav.productId,
          sku: fav.sku,
          name: fav.product?.name,
          imageKey: fav.product?.image, // 👈 SOLO KEY
          category: fav.product?.category,
        }));

        setItems(mapped);
      })
      .catch(() => {
        toast.error('Error cargando favoritos');
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleRemove = async (productId: string, sku: string) => {
    try {
      const res = await toggleFavorite({ productId, sku });

      if (!res.isFavorite) {
        setItems(prev =>
          prev.filter(item => item.productId !== productId),
        );
        toast.success('Eliminado de favoritos 💔');
      }
    } catch {
      toast.error('No se pudo eliminar el favorito');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mis favoritos</h1>
        <p className="text-sm text-gray-500">
          Productos que guardaste para más tarde
        </p>
      </div>

      {loading && (
        <div className="text-center py-20 text-gray-400">
          Cargando favoritos…
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          No hay favoritos aún
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group"
          >
            <Link href={`/product/${item.sku}`}>
              <div className="relative aspect-square bg-gray-100">
                {item.imageKey ? (
                  <Image
                    src={getProductImageUrl(item.imageKey)}
                    alt={item.name ?? 'Producto'}
                    fill
                    unoptimized
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sin imagen
                  </div>
                )}

                <button
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item.productId, item.sku);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-red-50 text-red-500"
                >
                  <IoHeartDislikeOutline size={18} />
                </button>
              </div>
            </Link>

            <div className="p-4 space-y-1">
              <p className="font-medium line-clamp-2">
                {item.name}
              </p>

              {item.category && (
                <p className="text-xs text-gray-500 capitalize">
                  {item.category}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { IoHeartDislikeOutline } from 'react-icons/io5';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import { getMyFavorites } from '@/services/favorites.service';

import { FavoriteItem } from '@/interfaces/favorite-row.interface';
import { Favorite } from '@/interfaces/favorite.interface';
import normalizeImage from '@/utils/normalizeImage';

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
          name: fav.product?.name,
          image: normalizeImage(fav.product?.image),
          category: fav.product?.category,
        }));

        setItems(mapped);
      })
      .catch(err => {
        console.error(err);
        toast.error('Error cargando favoritos');
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleRemove = (id: string) => {
    // luego acá llamás al backend
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success('Eliminado de favoritos');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Mis favoritos</h1>
        <p className="text-sm text-gray-500">
          Productos que guardaste para más tarde
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20 text-gray-400">
          Cargando favoritos…
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Todavía no agregaste productos a favoritos
        </div>
      )}

      {/* Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {items.map(item => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-2xl
              shadow-sm
              hover:shadow-md
              transition
              overflow-hidden
              group
            "
          >
            {/* Imagen */}
            <div className="relative aspect-square bg-gray-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name ?? 'Producto'}
                  fill
                  className="
                    object-cover
                    group-hover:scale-105
                    transition-transform
                  "
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  Sin imagen
                </div>
              )}

              {/* Remove */}
              <button
                onClick={() => handleRemove(item.id)}
                className="
                  absolute
                  top-3
                  right-3
                  p-2
                  rounded-full
                  bg-white/90
                  hover:bg-red-50
                  text-red-500
                  transition
                "
                title="Quitar de favoritos"
              >
                <IoHeartDislikeOutline size={18} />
              </button>
            </div>

            {/* Info */}
            <div className="p-4 space-y-1">
              <p className="font-medium leading-tight line-clamp-2">
                {item.name ?? 'Producto'}
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

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { IoHeartDislikeOutline } from 'react-icons/io5';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import { getMyFavorites, toggleFavorite  } from '@/services/favorites.service';


import { FavoriteItem } from '@/interfaces/favorite-row.interface';
import normalizeImage from '@/utils/normalizeImage';
import Link from 'next/link';

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

  const handleRemove = async (productId: string, sku: string) => {
    try {
      const res = await toggleFavorite({productId, sku});

      if(!res.isFavorite){
        setItems(prev => prev.filter(item => item.productId !== productId));
        toast.success('Eliminado de favoritos 💔');
      }
    } catch (error) {
      toast.error('No se pudo eliminar el favorito');
    }
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
        <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-6">
          
          <Image
            src="/imgs/empty-favorites.webp"
            alt="Sin favoritos"
            width={280}
            height={280}
            priority
          />

          <div className="text-center space-y-1">
            <p className="text-lg font-medium text-gray-700">
              No hay favoritos aún
            </p>
            <p className="text-sm text-gray-500">
              Todavía no agregaste productos a favoritos
            </p>
          </div>

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
          <Link href={`/product/${item.sku}`}>
            <div className="relative aspect-square bg-gray-100 cursor-pointer">
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
                onClick={(e) => {
                  e.preventDefault();   // ⛔ evita navegación
                  e.stopPropagation();  // ⛔ evita bubbling
                  handleRemove(item.productId, item.sku);
                }}
                className="
                  absolute top-3 right-3 p-2 rounded-full
                  bg-white/90 hover:bg-red-50 text-red-500 transition
                "
              >
                <IoHeartDislikeOutline size={18} />
              </button>
            </div>
          </Link>


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

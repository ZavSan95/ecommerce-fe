import Link from 'next/link';
import Image from 'next/image';

import { Product } from '@/interfaces';
import { getProductImageUrl } from '@/utils/image';

interface Props {
  product: Product;
}

export const ProductSuggestionItem = ({ product }: Props) => {
  const variant =
    product.variants.find(v => v.isDefault) ??
    product.variants[0];

  const imageKey = variant.images?.[0];

  return (
    <Link
      href={`/product/${variant.sku}`}
      className="
        group flex gap-4
        rounded-2xl
        border
        bg-white
        p-3
        transition
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      {/* Imagen */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={
            imageKey
              ? getProductImageUrl(imageKey)
              : '/placeholder.webp'
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-base font-semibold text-slate-900">
          ${variant.price}
        </p>

        <span className="text-xs text-slate-500">
          Ver producto →
        </span>
      </div>
    </Link>
  );
};

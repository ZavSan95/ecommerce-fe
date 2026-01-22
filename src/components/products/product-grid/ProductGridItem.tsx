'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/interfaces';
import { getProductImageUrl } from '@/utils/assets';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

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

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${defaultVariant.sku}`}>
        <Image
          src={displayImage}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-auto object-cover rounded"
          onError={(e) => {
            (e.currentTarget as any).src = '/placeholder.webp';
          }}
          onMouseEnter={() => secondaryImage && setDisplayImage(secondaryImage)}
          onMouseLeave={() => setDisplayImage(primaryImage)}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          href={`/product/${defaultVariant.sku}`}
          className="hover:text-blue-600"
        >
          {product.name}
        </Link>

        <span className="font-bold">
          ${defaultVariant.price}
        </span>
      </div>
    </div>
  );
};

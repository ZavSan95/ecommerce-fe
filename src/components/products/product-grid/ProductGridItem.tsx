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

  const images = defaultVariant.images;
  const [displayImage, setDisplayImage] = useState(images[0]);
  const [hasError, setHasError] = useState(false);

  const imageSrc = hasError ? '/placeholder.webp' : getProductImageUrl(displayImage);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={imageSrc}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-auto object-cover rounded"
          onError={() => setHasError(true)}
          onMouseEnter={() => images[1] && setDisplayImage(images[1])}
          onMouseLeave={() => setDisplayImage(images[0])}
          priority={false}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={`/product/${product.slug}`}
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

import { notFound } from 'next/navigation';
import { Product } from '@/interfaces/product.interface';
import { titleFont } from '@/config/fonts';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
} from '@/components';
import { endpoints } from '@/config/api';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface Props {
  params: {
    slug: string;
  };
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      endpoints.productBySlug(slug),
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    return await res.json();

  } catch {
    return null;
  }
}


export default async function ProductPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const variant =
    product.variants.find(v => v.isDefault) ?? product.variants[0];

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        <ProductMobileSlideshow
          title={product.name}
          images={variant.images ?? []}
          className="block md:hidden"
        />

        <ProductSlideshow
          title={product.name}
          images={variant.images ?? []}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <h1 className={`${titleFont.className} font-bold text-xl`}>
          {product.name}
        </h1>

        <p className="text-lg mb-5">
          ${variant.price}
        </p>

        {/* Acá después va el selector de variantes */}

        <AddToCartButton
          product={product}
          variant={variant}
        />

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
}

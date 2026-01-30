import { notFound } from 'next/navigation';
import { Product } from '@/interfaces/product.interface';
import { titleFont } from '@/config/fonts';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
} from '@/components';
import { endpoints } from '@/config/api';
import { ProductActions } from '@/components/product/ProductAction';

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[100vh]">

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
      <div
        className="
          col-span-1
          self-start
          rounded-3xl
          bg-white/90
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          px-7 py-7
          flex flex-col gap-5
          backdrop-blur-sm
        "
      >

        <h1 className="text-lg font-semibold leading-snug text-slate-900">
          {product.name}
        </h1>

        <p className="text-2xl font-semibold text-slate-900">
          ${variant.price}
        </p>



        {/* 👉 Acciones */}
        <ProductActions
          product={product}
          variant={variant}
        />

        <div className="pt-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Descripción
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

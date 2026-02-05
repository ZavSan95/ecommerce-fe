import { notFound } from 'next/navigation';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
} from '@/components';
import { ProductActions } from '@/components/product/ProductAction';
import { ProductSuggestions } from '@/components/product/product-suggestion/ProductSuggestions';
import { getRelatedProducts } from '@/services/products.service';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getRelatedProducts(slug);

  if (!product) {
    notFound();
  }

  const variant =
    product.variants.find(v => v.sku === slug) ??
    product.variants.find(v => v.isDefault) ??
    product.variants[0];

  return (
    <>
    <div className="max-w-7xl mx-auto px-4">
      {/* ================= PRODUCT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

      {/* ================= SUGGESTIONS ================= */}
      <ProductSuggestions
        relatedType={product.relatedType}
        variants={product.variants}
        relatedProducts={product.related}
        baseProduct={product}
      />
    </div>

    </>
  );
}

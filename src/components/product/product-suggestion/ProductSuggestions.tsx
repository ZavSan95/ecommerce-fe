import { Product } from '@/interfaces';
import { ProductSuggestionItem } from './ProductSuggestionItem';

interface Props {
  relatedType: 'variants' | 'products';
  variants?: Product['variants'];
  relatedProducts?: Product[];
  baseProduct?: Product;
}

export const ProductSuggestions = ({
  relatedType,
  variants = [],
  relatedProducts = [],
  baseProduct,
}: Props) => {
  if (
    (relatedType === 'variants' && variants.length <= 1) ||
    (relatedType === 'products' && relatedProducts.length === 0)
  ) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        {relatedType === 'variants'
          ? 'Otras opciones disponibles'
          : 'También te puede interesar'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedType === 'variants' &&
          variants.map(variant => (
            <ProductSuggestionItem
              key={variant.sku}
              product={{
                ...baseProduct!,
                variants: [variant],
              }}
            />
          ))}

        {relatedType === 'products' &&
          relatedProducts.map(product => (
            <ProductSuggestionItem
              key={product._id}
              product={product}
            />
          ))}
      </div>
    </section>
  );
};

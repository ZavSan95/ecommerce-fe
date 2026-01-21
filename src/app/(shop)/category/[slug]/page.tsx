import { ProductGrid, Title } from '@/components';
import { endpoints } from '@/config/api';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

async function getProductsByCategory(slug: string) {
  try {
    const res = await fetch(
      endpoints.productsByCategory(slug),
      { cache: 'no-store' }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];

  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {

  const { slug } = params;

  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    notFound(); // opcional
  }

  return (
    <>
      <Title
        title={`Categoría: ${slug}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}

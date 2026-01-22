import { EmptyProducts, ProductGrid, Title } from '@/components';
import { endpoints } from '@/config/api';
import { fetchCategories } from '@/services/categories.service';
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
  
  const [categories, products] = await Promise.all([
    fetchCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find( c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const message = 'No hay productos disponibles en esta categoría';

  return (
    <div className="flex flex-col flex-1">
      <Title
        title={`Categoría: ${category?.name}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <div className="flex-1">
        {products.length === 0 ? (
          <EmptyProducts message={message} />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}

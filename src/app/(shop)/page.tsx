import { ProductGrid, Title } from '@/components';
import { getProducts } from '@/services/products.service';

export default async function Home() {

  const response = await getProducts({
    page: 1,
    limit: 6,
    sort: 'createdAt:desc', // opcional
  });

  const products = response.data ?? [];

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      {products.length === 0 ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          <p>No hay productos disponibles por el momento</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  );
}

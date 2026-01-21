import { ProductGrid, Title } from '@/components';
import { Product } from '@/interfaces';
import { initialData } from '@/seed/seed';


async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3000/api/catalog/products', {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Error HTTP al obtener productos');
      return [];
    }

    const data = await res.json();

    // seguridad extra por si la API devuelve algo raro
    if (!Array.isArray(data)) {
      return [];
    }

    return data;

  } catch (error) {
    console.error('Error fetch productos:', error);
    return [];
  }
}


export default async function Home() {
  const products = await getProducts();
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

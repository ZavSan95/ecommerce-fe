import { ProductGrid, Title } from '@/components';
import { Product } from '@/interfaces';
import { initialData } from '@/seed/seed';


async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/catalog/products', {
    cache: 'no-store', // mientras estás desarrollando
  });

  if (!res.ok) {
    throw new Error('Error al obtener productos');
  }

  return res.json();
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

      <ProductGrid 
        products={ products }
      />
      
    </>
  );
}

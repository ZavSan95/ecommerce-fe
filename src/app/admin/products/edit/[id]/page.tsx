import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/products/ProductForm';
import { getProductById } from '@/services/products.service';

interface Props {
  params: {
    id: string;
  };
}

/* ===================== */
/* Page                  */
/* ===================== */
export default async function EditProductPage({ params }: Props) {
  try {
    const product = await getProductById(params.id);

    return (
      <div className="space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Editar producto
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <ProductForm
            isEdit
            productId={params.id}
            defaultValues={product}
          />
        </div>

      </div>
    );
  } catch {
    notFound();
  }
}

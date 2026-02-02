import { ProductForm } from '@/components/admin/products/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Nuevo producto
        </h1>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 w-full">
        <ProductForm />
      </div>

    </div>
  );
}

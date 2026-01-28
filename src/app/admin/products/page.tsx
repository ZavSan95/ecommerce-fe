export default function ProductsAdminPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <a
          href="/admin/products/new"
          className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          Nuevo Producto
        </a>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        {/* acá va tu tabla */}
        Tabla de productos
      </div>
    </div>
  );
}

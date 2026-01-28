export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card title="Ventas" value="$ 1.240.000" hint="+12% vs mes anterior" />
        <Card title="Órdenes" value="342" hint="23 pendientes" />
        <Card title="Productos" value="1.284" hint="15 sin stock" />
        <Card title="Usuarios" value="890" hint="7 nuevos hoy" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold">Actividad</h2>
          <p className="text-sm text-slate-600 mt-1">
            Acá podés meter un chart o tabla (recharts, etc).
          </p>
          <div className="mt-4 h-56 rounded-xl bg-slate-100" />
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <h2 className="font-semibold">Pendientes</h2>
          <ul className="mt-3 space-y-3">
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-sm font-medium">Revisar órdenes con pago pendiente</div>
              <div className="text-xs text-slate-600">7 órdenes</div>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-sm font-medium">Productos sin stock</div>
              <div className="text-xs text-slate-600">15 productos</div>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-sm font-medium">Usuarios nuevos</div>
              <div className="text-xs text-slate-600">7 hoy</div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function Card({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{hint}</div>
    </div>
  );
}

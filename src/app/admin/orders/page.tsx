'use client'


import { AdminTable } from "@/components/admin/AdminTable";
import { TableActions } from "@/components/admin/TableActions";
import { OrderApiResponse } from "@/interfaces/order-api-response.interface";
import { OrderRow } from "@/interfaces/order-row.interface";
import { PaginationMeta } from "@/interfaces/pagination.interface";
import { Pagination } from '@/components/ui/pagination/Pagination';
import { getOrders } from "@/services/orders.client";
import { useEffect, useState } from "react";

export default function OrdersAdminPage() {

  const [rows, setRows] = useState<OrderRow[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
  getOrders({ page, limit: 10 })
    .then(res => {
      const mappedRows: OrderRow[] = res.data.map((order: OrderApiResponse) => {
        const payment = order.payments?.[0];

        return {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,

          paymentStatus: payment?.status ?? '—',
          paymentProvider: payment?.provider ?? '—',

          totalAmount: Number(order.totalAmount),
          currency: order.currency,
          createdAt: order.createdAt,
        };
      });

      setRows(mappedRows);
      setMeta(res.meta);
    })
    .catch(err => {
      console.error('Error al cargar ordenes', err);
    });
  }, [page]);


  

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Órdenes</h1>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">

        <AdminTable<OrderRow>
          
          columns={[
            { key:  'orderNumber', label: '#'},
            { key: 'status', label: 'Estado'},
            { key: 'paymentStatus', label: 'Pago' },
            { key: 'totalAmount', label: 'Monto' },
            { key: 'createdAt', label: 'Fecha' },

          ]}

          data={rows}
          renderActions={row => (
            <TableActions
              editHref={`/admin/orders/${row.id}/edit`}
              onDelete={() => alert(`Eliminar ${row.orderNumber}`)}
            />
          )}
        />

        {meta && (
          <Pagination
            current={meta.currentPage}
            total={meta.totalPages}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

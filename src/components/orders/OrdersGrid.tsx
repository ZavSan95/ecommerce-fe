import { Order } from "@/interfaces/orders.interface";
import Link from "next/link";

interface Props {
  orders: Order[];
}

export const OrdersGrid = ({ orders }: Props) => {

  if (!orders || orders.length === 0) {
    return (
      <p className="text-gray-500 mt-10">
        Todavía no tenés órdenes realizadas.
      </p>
    );
  }

  return (
    <div className="mb-10">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Cliente</th>
            <th className="px-6 py-4 text-left">Estado</th>
            <th className="px-6 py-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{order.orderNumber}</td>
              <td className="px-6 py-4">{order.customerName}</td>
              <td className="px-6 py-4">{order.status}</td>
              <td className="px-6 py-4">
                <Link href={`/orders/${order.id}`} className="underline">
                  Ver orden
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

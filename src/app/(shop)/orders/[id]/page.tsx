import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

import { Title } from '@/components';
import { OrderDetail } from '@/interfaces/order-detail';
import { getOrderById } from '@/services/orders.server';


interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {

  const order: OrderDetail | null = await getOrderById(params.id);

  if (!order) {
    notFound();
  }

  const payment = order.payments?.[0];
  const isPaid =
    order.status === 'paid' || payment?.status === 'paid';

  const totalItems = order.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="flex justify-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${order.orderNumber}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* ================== ITEMS ================== */}
          <div className="flex flex-col mt-5">

            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-green-700': isPaid,
                  'bg-red-500': !isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">
                {isPaid ? 'Pagada' : 'Pendiente de pago'}
              </span>
            </div>

            {order.items.map(item => (
              <div key={item.id} className="flex mb-5">

                {/* Placeholder imagen */}
                <div className="w-[100px] h-[100px] bg-gray-200 rounded mr-5 flex items-center justify-center text-xs text-gray-500">
                  Sin imagen
                </div>

                <div>
                  <p className="font-medium">{item.productName}</p>

                  {item.variantName && (
                    <p className="text-sm text-gray-500">
                      {item.variantName}
                    </p>
                  )}

                  <p>
                    ${item.unitPrice} x {item.quantity}
                  </p>

                  <p className="font-bold">
                    Subtotal: ${item.totalPrice}
                  </p>
                </div>

              </div>
            ))}

          </div>

          {/* ================== RESUMEN ================== */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-4">Resumen de orden</h2>

            <div className="grid grid-cols-2 gap-y-1 text-sm">

              <span>Productos</span>
              <span className="text-right">
                {totalItems}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                ${order.subtotalAmount}
              </span>

              <span>Descuento</span>
              <span className="text-right">
                ${order.discountAmount}
              </span>

              <span>Impuestos</span>
              <span className="text-right">
                ${order.taxAmount}
              </span>

              <span>Envío</span>
              <span className="text-right">
                ${order.shippingAmount}
              </span>

              <span className="mt-4 text-2xl font-bold">
                Total
              </span>
              <span className="mt-4 text-2xl text-right font-bold">
                ${order.totalAmount}
              </span>

            </div>

            <div className="mt-6">
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white',
                  {
                    'bg-green-700': isPaid,
                    'bg-red-500': !isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">
                  {isPaid ? 'Pago confirmado' : 'Pendiente de pago'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

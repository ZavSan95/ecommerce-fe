'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  const items = useAppSelector(state => state.cart.items);

  if (items.length === 0) {
    redirect('/empty');
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal;

  return (
    <div className="flex justify-center px-10 sm:px-0 mb-20">
      <div className="w-[1000px] flex flex-col">

        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Items */}
          <div className="flex flex-col mt-5">
            <span className="text-xl mb-2">Productos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            {items.map(item => (
              <div
                key={`${item.productId}-${item.variantSku}`}
                className="flex mb-5"
              >
                <Image
                  src={item.image ?? '/placeholder.webp'}
                  width={100}
                  height={100}
                  alt={item.productName}
                  className="mr-5 rounded"
                />

                <div>
                  <p className="font-medium">{item.productName}</p>

                  {item.attributes && (
                    <p className="text-sm text-gray-500">
                      {Object.entries(item.attributes)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' · ')}
                    </p>
                  )}

                  <p>
                    ${item.price} x {item.quantity}
                  </p>

                  <p className="font-bold">
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-4">Resumen de orden</h2>

            <div className="grid grid-cols-2 mb-4">
              <span>No. Productos</span>
              <span className="text-right">{totalItems}</span>

              <span>Subtotal</span>
              <span className="text-right">${subtotal}</span>

              <span className="mt-4 text-2xl font-bold">Total</span>
              <span className="mt-4 text-2xl font-bold text-right">
                ${total.toFixed(2)}
              </span>
            </div>

            <p className="text-xs mb-4">
              Al continuar aceptás nuestros{' '}
              <a className="underline" href="#">términos y condiciones</a>
            </p>

            <Link
              href="/checkout/address"
              className="btn-primary flex justify-center"
            >
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

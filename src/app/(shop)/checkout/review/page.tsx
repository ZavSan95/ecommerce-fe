'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Title } from '@/components';
import { Spinner } from '@/components/ui/spiner/Spiner';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAppSelector } from '@/store/hooks';

export default function ReviewPage() {

  const { isAuthenticated, isChecking } = useAuthGuard('/checkout/review', 600);

  const cartItems = useAppSelector(state => state.cart.items);
  const address = useAppSelector(state => state.checkout.address);
  const paymentMethod = useAppSelector(state => state.checkout.paymentMethod);

  if (isChecking) {
    return <Spinner label="Verificando información..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (cartItems.length === 0) {
    redirect('/empty');
  }

  if (!address) {
    redirect('/checkout/address');
  }

  if (!paymentMethod) {
    redirect('/checkout/payment');
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center px-10 sm:px-0 mb-40">
      <div className="w-full xl:w-[1000px] flex flex-col">

        <Title title="Revisar orden" subtitle="Confirmá antes de pagar" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* ===================== */}
          {/* PRODUCTOS */}
          {/* ===================== */}
          <div className="flex flex-col gap-4">

            <h3 className="text-xl font-semibold">Productos</h3>

            {cartItems.map(item => (
              <div
                key={`${item.productId}-${item.variantSku}`}
                className="flex gap-4 border-b pb-4"
              >
                <Image
                  src={item.image ?? '/placeholder.webp'}
                  width={80}
                  height={80}
                  alt={item.productName}
                  className="rounded"
                />

                <div className="flex flex-col">
                  <span className="font-medium">{item.productName}</span>

                  {item.attributes && (
                    <span className="text-sm text-gray-500">
                      {Object.entries(item.attributes)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' · ')}
                    </span>
                  )}

                  <span className="text-sm">
                    {item.quantity} × ${item.price}
                  </span>

                  <span className="font-semibold">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ===================== */}
          {/* RESUMEN */}
          {/* ===================== */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h3 className="text-xl font-semibold mb-4">Resumen</h3>

            {/* Dirección */}
            <div className="mb-4">
              <p className="font-medium">Dirección de envío</p>
              <p className="text-sm text-gray-600">
                {address.firstName} {address.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {address.address}
                {address.address2 && `, ${address.address2}`}
              </p>
              <p className="text-sm text-gray-600">
                {address.city} ({address.postalCode}) – {address.country}
              </p>
              <p className="text-sm text-gray-600">
                Tel: {address.phone}
              </p>

              <Link
                href="/checkout/address"
                className="text-sm underline mt-1 inline-block"
              >
                Editar
              </Link>
            </div>

            {/* Pago */}
            <div className="mb-4">
              <p className="font-medium">Método de pago</p>
              <p className="text-sm text-gray-600 capitalize">
                {paymentMethod}
              </p>

              <Link
                href="/checkout/payment"
                className="text-sm underline mt-1 inline-block"
              >
                Cambiar
              </Link>
            </div>

            {/* Totales */}
            <div className="grid grid-cols-2 mb-6">
              <span>Subtotal</span>
              <span className="text-right">${subtotal}</span>

              <span className="mt-2 text-lg font-bold">Total</span>
              <span className="mt-2 text-lg font-bold text-right">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Acción */}
            <button className="btn-primary w-full">
              Confirmar y pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

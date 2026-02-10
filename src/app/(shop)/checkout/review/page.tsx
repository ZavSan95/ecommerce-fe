'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { Title } from '@/components';
import { Spinner } from '@/components/ui/spiner/Spiner';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { createOrder } from '@/services/orders.client';
import { clearCart } from '@/store/cart/cartSlice';
import { PaymentProvider } from '@/enum/payments-providers';
import { getProductImageUrl } from '@/utils/image';

export default function ReviewPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, isChecking } = useAuthGuard('/checkout/review', 600);

  const cartItems = useAppSelector(state => state.cart.items);
  const address = useAppSelector(state => state.checkout.address);
  const paymentMethod = useAppSelector(state => state.checkout.paymentMethod);
  const user = useAppSelector(state => state.auth.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ HOOK SIEMPRE ARRIBA (antes de returns / redirects)
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  // ⛔ Recién después lógica condicional
  if (isChecking) return <Spinner label="Verificando información..." />;
  if (!isAuthenticated) return null;

  if (cartItems.length === 0) redirect('/empty');
  if (!address) redirect('/checkout/address');
  if (!paymentMethod) redirect('/checkout/payment');

  const onConfirm = async () => {
    try {
      setIsSubmitting(true);

      const payload = {

        customerId: user!.id,
        customerEmail: user!.email,
        customerName: user!.name,

        items: cartItems.map(i => ({
          productId: i.productId,
          sku: i.variantSku,
          quantity: i.quantity,
        })),
        billingAddress: {
          fullName: `${address.firstName} ${address.lastName}`,
          phone: address.phone,
          street: address.address,
          number: address.address2 || '0',
          city: address.city,
          state: address.state ?? 'Santa Fe',
          postalCode: address.postalCode,
          country: address.country,
        },
        shippingAddress: {
          fullName: `${address.firstName} ${address.lastName}`,
          phone: address.phone,
          street: address.address,
          number: address.address2 || '0',
          city: address.city,
          state: address.state ?? 'Santa Fe',
          postalCode: address.postalCode,
          country: address.country,
        },
        paymentProvider: paymentMethod,
      } as const;

      const resp = await createOrder(payload);
      console.log(resp);

      if (!resp.payment.checkoutUrl) {
        throw new Error('No se recibió checkoutUrl para redirigir al pago');
      }

      dispatch(clearCart());

      window.location.href = resp.payment.checkoutUrl;
    } catch (e: any) {
      console.error('ERROR BACKEND:', e);
      console.error('ERROR RESPONSE:', e?.response);
      toast.error(e?.message ?? 'Error al crear la orden');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center px-10 sm:px-0 mb-40">
      <div className="w-full xl:w-[1000px] flex flex-col">
        <Title title="Revisar orden" subtitle="Confirmá antes de pagar" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* PRODUCTOS */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Productos</h3>

            {cartItems.map(item => (
              <div
                key={`${item.productId}-${item.variantSku}`}
                className="flex gap-4 border-b pb-4"
              >
                <Image
                  src={
                    item.image
                      ? getProductImageUrl(item.image)
                      : '/placeholder.webp'
                  }
                  width={80}
                  height={80}
                  alt={item.productName}
                  className="rounded object-cover"
                  unoptimized
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

          {/* RESUMEN */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h3 className="text-xl font-semibold mb-4">Resumen</h3>

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

            <div className="grid grid-cols-2 mb-6">
              <span>Subtotal</span>
              <span className="text-right">${subtotal}</span>

              <span className="mt-2 text-lg font-bold">Total</span>
              <span className="mt-2 text-lg font-bold text-right">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              className="btn-primary w-full disabled:opacity-60"
              disabled={isSubmitting}
              onClick={onConfirm}
            >
              {isSubmitting ? 'Creando orden...' : 'Confirmar y pagar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

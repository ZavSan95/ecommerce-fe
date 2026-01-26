'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Title } from '@/components';
import { Spinner } from '@/components/ui/spiner/Spiner';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPaymentMethod } from '@/store/checkout/checkoutSlice';
import { PaymentProvider } from '@/enum/payments-providers';


export default function PaymentPage() {

  const { isAuthenticated, isChecking } = useAuthGuard('/checkout/payment', 600);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const currentMethod = useAppSelector(
    state => state.checkout.paymentMethod
  );

  const [selected, setSelected] = useState<PaymentProvider | null>(currentMethod);

  useEffect(() => {
    if (currentMethod) {
      setSelected(currentMethod);
    }
  }, [currentMethod]);

  if (isChecking) {
    return <Spinner label="Verificando sesión..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleContinue = () => {
    if (!selected) return;

    dispatch(setPaymentMethod(selected));
    router.push('/checkout/review');
  };

  const optionClass = (active: boolean) =>
    `
    border rounded-lg p-4 cursor-pointer transition
    ${active
      ? 'border-blue-600 bg-blue-50'
      : 'border-gray-300 hover:border-gray-400'}
    `;

  return (
    <div className="flex flex-col sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full xl:w-[1000px] flex flex-col">

        <Title
          title="Método de pago"
          subtitle="Seleccioná cómo querés pagar"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

          {/* MercadoPago */}
            <div
              onClick={() => setSelected(PaymentProvider.MERCADOPAGO)}
              className={optionClass(selected === PaymentProvider.MERCADOPAGO)}
            >
            <h3 className="text-lg font-semibold mb-1">
              MercadoPago
            </h3>
            <p className="text-sm text-gray-600">
              Pagá con tarjeta, dinero en cuenta o cuotas
            </p>
          </div>

          {/* Transferencia */}
            <div
              onClick={() => setSelected(PaymentProvider.TRANSFERENCIA)}
              className={optionClass(selected === PaymentProvider.TRANSFERENCIA)}
            >
            <h3 className="text-lg font-semibold mb-1">
              Transferencia bancaria
            </h3>
            <p className="text-sm text-gray-600">
              Transferencia directa a nuestra cuenta
            </p>
          </div>

        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-10">

          <button
            onClick={() => router.back()}
            className="btn-secondary w-1/2"
          >
            Volver
          </button>

          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`btn-primary w-1/2 ${
              !selected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Continuar
          </button>

        </div>

      </div>
    </div>
  );
}

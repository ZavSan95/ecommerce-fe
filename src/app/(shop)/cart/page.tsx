'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeItem, updateQuantity } from '@/store/cart/cartSlice';
import { redirect } from 'next/navigation';
import { QuantitySelector, Title } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImageUrl } from '@/utils/image';

export default function CartPage() {

  const items = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return redirect('/empty');
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal;

  return (
    <div className="flex justify-center px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Items */}
          <div className="flex flex-col gap-5 mt-5">
            {items.map(item => (
              <div
                key={`${item.productId}-${item.variantSku}`}
                className="
                  flex gap-5
                  bg-white
                  rounded-xl
                  p-4
                  shadow-md
                  hover:shadow-lg
                  transition-shadow
                "
              >
                {/* Imagen */}
                <Image
                  src={
                    item.image
                      ? getProductImageUrl(item.image)
                      : '/placeholder.webp'
                  }
                  width={120}
                  height={120}
                  alt={item.productName}
                  className="rounded-lg object-cover"
                />

                {/* Info */}
                <div className="flex flex-col flex-1 justify-between">

                  <div>
                    <p className="font-semibold text-lg">
                      {item.productName}
                    </p>

                    {item.attributes && (
                      <p className="text-sm text-gray-500 mt-1">
                        {Object.entries(item.attributes)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' · ')}
                      </p>
                    )}

                    <p className="mt-2 font-medium">
                      ${item.price}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center justify-between mt-3">

                    <QuantitySelector
                      quantity={item.quantity}
                      max={item.stock}
                      onChange={(newQuantity) =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            variantSku: item.variantSku,
                            quantity: newQuantity,
                          })
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        dispatch(
                          removeItem({
                            productId: item.productId,
                            variantSku: item.variantSku,
                          })
                        )
                      }
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Resumen de orden
            </h2>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span>Productos</span>
              <span className="text-right">{totalItems}</span>

              <span>Subtotal</span>
              <span className="text-right">${subtotal}</span>

              <span className="mt-3 font-semibold text-lg">Total</span>
              <span className="mt-3 font-semibold text-lg text-right">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="flex justify-center items-center w-full rounded-md bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Checkout
            </Link>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Los impuestos y costos de envío se calculan en el checkout
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

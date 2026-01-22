'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCart } from '@/store/ui/uiSlice';
import { removeItem, updateQuantity } from '@/store/cart/cartSlice';
import { QuantitySelector } from '../product/quantity-selector/QuantitySelector';

export const CartDrawer = () => {
  const dispatch = useAppDispatch();

  const isCartOpen = useAppSelector(state => state.ui.isCartOpen);
  const items = useAppSelector(state => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay / click outside */}
      {isCartOpen && (
        <div
          onClick={() => dispatch(closeCart())}
          className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <aside
        className={clsx(
          `
          fixed top-0 right-0 z-20 h-screen
          w-[90%] sm:w-[420px]
          bg-white shadow-2xl
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          `,
          {
            'translate-x-0': isCartOpen,
            'translate-x-full': !isCartOpen,
          }
        )}
      >
        {/* Header */}
        <div className="relative p-5 border-b">
          <h2 className="text-lg font-semibold">Carrito</h2>

          <button
            aria-label="Cerrar carrito"
            onClick={() => dispatch(closeCart())}
            className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 transition"
          >
            <IoCloseOutline size={32} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Tu carrito está vacío
            </p>
          ) : (
            items.map(item => (
              <div
                key={`${item.productId}-${item.variantSku}`}
                className="flex gap-4 py-4 border-b last:border-b-0"
              >
                <Image
                  src={item.image ?? '/placeholder.webp'}
                  alt={item.productName}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>

                  {item.attributes && (
                    <p className="text-xs text-gray-500 mt-1">
                      {Object.entries(item.attributes)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' · ')}
                    </p>
                  )}

                  <p className="mt-1 font-semibold">
                    ${item.price}
                  </p>

                  <div className="flex items-center justify-between mt-2">
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
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-5 py-4">
          <div className="flex justify-between text-base font-medium mb-4">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <Link
            href="/checkout"
            onClick={() => dispatch(closeCart())}
            className="flex justify-center items-center w-full rounded-md bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Checkout
          </Link>

          <button
            onClick={() => dispatch(closeCart())}
            className="mt-3 w-full text-center text-sm text-gray-500 hover:underline"
          >
            Seguir comprando →
          </button>
        </div>
      </aside>
    </>
  );
};

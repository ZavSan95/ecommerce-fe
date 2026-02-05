'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  IoSearchOutline,
  IoCartOutline,
  IoCloseOutline,
} from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  openCart,
  closeCart,
  openSideMenu,
  closeSideMenu,
} from '@/store/ui/uiSlice';
import { Category } from '@/interfaces/categories.interface';
import { fetchCategories } from '@/services/categories.service';
import { selectCartTotalItems } from '@/store/cart/cart.selectors';
import { SearchDropdown } from '@/components/search/SearchDropdown';

export const TopMenu = () => {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useAppDispatch();

  const totalItems = useAppSelector(selectCartTotalItems);
  const isSideMenuOpen = useAppSelector(state => state.ui.isSideMenuOpen);
  const isCartOpen = useAppSelector(state => state.ui.isCartOpen);

  useEffect(() => {
    setMounted(true);

    fetchCategories({ limit: 6 })
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  if (!mounted) return null;

  return (
    <>
      <nav className="flex px-5 justify-between items-center w-full">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${titleFont.className} font-bold`}>
              Ecommerce
            </span>
            <span> | Shop</span>
          </Link>
        </div>

        {/* Center Menu (desktop) */}
        <div className="hidden sm:block">
          {categories.length === 0 ? (
            <span className="text-sm text-gray-400">
              Sin categorías
            </span>
          ) : (
            categories.map(category => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 capitalize"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="mx-2 p-2 rounded-md hover:bg-gray-100"
            aria-label="Buscar"
          >
            <IoSearchOutline className="w-5 h-5" />
          </button>

          {/* Cart toggle */}
          <button
            onClick={() =>
              isCartOpen
                ? dispatch(closeCart())
                : dispatch(openCart())
            }
            aria-label={
              isCartOpen ? 'Cerrar carrito' : 'Abrir carrito'
            }
            className="mx-2 relative p-2 rounded-md hover:bg-gray-100 transition"
          >
            {totalItems > 0 && !isCartOpen && (
              <span className="absolute -top-1 -right-2 text-xs bg-blue-700 text-white rounded-full px-1.5">
                {totalItems}
              </span>
            )}

            {isCartOpen ? (
              <IoCloseOutline className="w-5 h-5 text-gray-800" />
            ) : (
              <IoCartOutline className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* Sidebar toggle */}
          <button
            onClick={() =>
              isSideMenuOpen
                ? dispatch(closeSideMenu())
                : dispatch(openSideMenu())
            }
            aria-label={
              isSideMenuOpen ? 'Cerrar menú' : 'Abrir menú'
            }
            className="m-2 p-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center"
          >
            <div className="relative w-4 h-4">
              <span
                className={`
                  absolute left-0 top-1/2
                  w-4 h-[1.5px]
                  bg-gray-800
                  transition-transform duration-300
                  origin-center
                  ${
                    isSideMenuOpen
                      ? 'rotate-45'
                      : '-translate-y-1.5'
                  }
                `}
              />
              <span
                className={`
                  absolute left-0 top-1/2
                  w-4 h-[1.5px]
                  bg-gray-800
                  transition-opacity duration-200
                  ${
                    isSideMenuOpen
                      ? 'opacity-0'
                      : 'opacity-100'
                  }
                `}
              />
              <span
                className={`
                  absolute left-0 top-1/2
                  w-4 h-[1.5px]
                  bg-gray-800
                  transition-transform duration-300
                  origin-center
                  ${
                    isSideMenuOpen
                      ? '-rotate-45'
                      : 'translate-y-1.5'
                  }
                `}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* 🔍 Search overlay */}
      {isSearchOpen && (
        <SearchDropdown
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
};

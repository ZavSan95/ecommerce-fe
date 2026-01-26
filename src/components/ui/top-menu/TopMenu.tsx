'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openCart, openSideMenu } from '@/store/ui/uiSlice';
import { Category } from '@/interfaces/categories.interface';
import { fetchCategories } from '@/services/categories.service';
import { selectCartTotalItems } from '@/store/cart/cart.selectors';

export const TopMenu = () => {

  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartTotalItems);

  useEffect(() => {
    setMounted(true);
    fetchCategories().then(setCategories);
  }, []);

  if (!mounted) return null; // 👈 CLAVE

  return (
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

      {/* Center Menu */}
      <div className="hidden sm:block">
        {categories.length === 0 ? (
          <span className="text-sm text-gray-400">Sin categorías</span>
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
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <button
          onClick={() => dispatch(openCart())}
          className="mx-2 relative"
        >
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-blue-700 text-white rounded-full px-1">
              {totalItems}
            </span>
          )}
          <IoCartOutline className="w-5 h-5" />
        </button>

        <button
          onClick={() => dispatch(openSideMenu())}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};

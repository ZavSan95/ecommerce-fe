'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useAppDispatch } from '@/store/hooks';
import { openSideMenu } from '@/store/ui/uiSlice';
import { Category } from '@/interfaces/categories.interface';

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('http://localhost:3000/api/categories', {
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];

  } catch {
    return [];
  }
}


export const TopMenu = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">

      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} font-bold`}>
            Teslo
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

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

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

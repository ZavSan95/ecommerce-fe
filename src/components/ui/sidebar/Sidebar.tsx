'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeSideMenu } from '@/store/ui/uiSlice';
import { fetchCategories } from '@/services/categories.service';
import { useEffect, useState } from 'react';
import { Category } from '@/interfaces/categories.interface';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSideMenuOpen = useAppSelector(state => state.ui.isSideMenuOpen);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <>
      {/* Overlay / click outside */}
      {isSideMenuOpen && (
        <div
          onClick={() => dispatch(closeSideMenu())}
          className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          `
          fixed top-0 right-0 z-20 h-screen
          w-[85%] sm:w-[400px]
          bg-white shadow-2xl
          transform transition-transform duration-300 ease-in-out
          p-5
          `,
          {
            'translate-x-0': isSideMenuOpen,
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        {/* Close (X) */}
        <button
          aria-label="Cerrar menú"
          onClick={() => dispatch(closeSideMenu())}
          className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 transition"
        >
          <IoCloseOutline size={36} />
        </button>

        {/* Search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar productos"
            className="w-full bg-gray-50 rounded-lg pl-10 py-2 pr-3 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categorías (solo mobile) */}
        <div className="sm:hidden mt-8">
          <h3 className="text-lg font-semibold mb-3">Categorías</h3>

          {categories.map(category => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              onClick={() => dispatch(closeSideMenu())}
              className="block py-2 px-2 rounded hover:bg-gray-100 capitalize"
            >
              {category.name}
            </Link>
          ))}

          <div className="w-full h-px bg-gray-200 my-6" />
        </div>

        {/* User menu */}
        <Link
          href="/profile"
          onClick={() => dispatch(closeSideMenu())}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <IoPersonOutline size={22} />
          <span className="text-lg">Perfil</span>
        </Link>

        <Link
          href="/orders"
          onClick={() => dispatch(closeSideMenu())}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <IoTicketOutline size={22} />
          <span className="text-lg">Órdenes</span>
        </Link>

        <Link
          href="/login"
          onClick={() => dispatch(closeSideMenu())}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <IoLogInOutline size={22} />
          <span className="text-lg">Ingresar</span>
        </Link>

        <Link
          href="/logout"
          onClick={() => dispatch(closeSideMenu())}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <IoLogOutOutline size={22} />
          <span className="text-lg">Salir</span>
        </Link>

        {/* Admin */}
        <div className="w-full h-px bg-gray-200 my-6" />

        <Link
          href="/admin/products"
          onClick={() => dispatch(closeSideMenu())}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <IoShirtOutline size={22} />
          <span className="text-lg">Productos</span>
        </Link>

        <Link
          href="/admin/users"
          onClick={() => dispatch(closeSideMenu())}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <IoPeopleOutline size={22} />
          <span className="text-lg">Usuarios</span>
        </Link>
      </nav>
    </>
  );
};

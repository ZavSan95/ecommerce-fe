'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
  IoHeartOutline,
  IoGridOutline,
} from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeSideMenu } from '@/store/ui/uiSlice';
import { useRouter } from 'next/navigation';
import { logoutRequest } from '@/services/auth.service';
import { clearAuth } from '@/store/auth/authSlice';
import toast from 'react-hot-toast';

export const Sidebar = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const isSideMenuOpen = useAppSelector(state => state.ui.isSideMenuOpen);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAdmin = isAuthenticated && user?.roles.includes('admin');

  const handleLogout = async () => {
    try {
      await logoutRequest();
      toast.success('Sesión cerrada correctamente');
    } catch {
      toast.error('Error al cerrar sesión');
    } finally {
      dispatch(clearAuth());
      dispatch(closeSideMenu());
      router.replace('/');
    }
  };

  const userMenuItems = [
    { href: '/profile', label: 'Perfil', icon: IoPersonOutline },
    { href: '/orders', label: 'Órdenes', icon: IoTicketOutline },
    { href: '/favorites', label: 'Favoritos', icon: IoHeartOutline },
  ];

  return (
    <>
      {/* Overlay */}
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
        {/* Search */}
        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-3 left-3 text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar productos"
            className="w-full bg-gray-50 rounded-lg pl-10 py-2 pr-3 text-base border border-gray-200"
          />
        </div>

        {/* MENU */}
        <div className="mt-8 space-y-1">
          {isAuthenticated ? (
            <>
              {userMenuItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => dispatch(closeSideMenu())}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                >
                  <item.icon size={22} />
                  <span className="text-lg">{item.label}</span>
                </Link>
              ))}

              {/* ADMIN */}
              {isAdmin && (
                <>
                  <div className="w-full h-px bg-gray-200 my-4" />

                  <Link
                    href="/admin"
                    onClick={() => dispatch(closeSideMenu())}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                  >
                    <IoGridOutline size={22} />
                    <span className="text-lg font-medium">Admin Dashboard</span>
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 p-2 rounded hover:bg-gray-100 text-left"
              >
                <IoLogOutOutline size={22} />
                <span className="text-lg">Salir</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => dispatch(closeSideMenu())}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
              >
                <IoLogInOutline size={22} />
                <span className="text-lg">Ingresar</span>
              </Link>

              <Link
                href="/auth/register"
                onClick={() => dispatch(closeSideMenu())}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
              >
                <IoPersonOutline size={22} />
                <span className="text-lg">Crear cuenta</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

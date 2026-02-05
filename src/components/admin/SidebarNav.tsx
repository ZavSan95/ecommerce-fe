'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useAdminLayout } from './AdminContext';
import { NavItem } from './types';
import { useAppDispatch } from '@/store/hooks';
import { clearAuth } from '@/store/auth/authSlice';
import { logoutRequest } from '@/services/auth.service';
import toast from 'react-hot-toast';

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Categorías', href: '/admin/categories', icon: '🏷️'},
  { label: 'Productos', href: '/admin/products', icon: '📦' },
  { label: 'Órdenes', href: '/admin/orders', icon: '🛒' },
  { label: 'Usuarios', href: '/admin/users', icon: '👤' },
];

export function SidebarNav() {
  const pathname = usePathname();

  const { isCollapsed } = useAdminLayout();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutRequest();
      toast.success('Sesión cerrada correctamente');
    } catch {
      toast.error('Error al cerrar sesión');
    } finally {
      dispatch(clearAuth());
      router.replace('/');
    }
  };

  return (
    <nav className="p-3 space-y-1">
      {navItems.map(item => {
        const active =
          pathname === item.href ||
          pathname.startsWith(item.href + '/');

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition',
              active
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/10',
            )}
          >
            <span>{item.icon}</span>
            {!isCollapsed && (
              <span className="text-sm">{item.label}</span>
            )}
          </Link>
        );
      })}

      {/* Divider */}
      <div className="my-3 border-t border-white/10" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          w-full
          flex items-center gap-3
          px-3 py-2.5
          rounded-xl
          text-slate-300
          hover:bg-red-500/10
          hover:text-red-400
          transition
        "
      >
        <span>🚪</span>
        {!isCollapsed && (
          <span className="text-sm">Salir</span>
        )}
      </button>
    </nav>
  );
}

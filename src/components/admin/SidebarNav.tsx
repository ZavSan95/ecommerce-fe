'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { useAdminLayout } from './AdminContext';
import { NavItem } from './types';

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

  return (
    <nav className="p-3 space-y-1">
      {navItems.map(item => {
        const active = pathname === item.href || pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition',
              active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10',
            )}
          >
            <span>{item.icon}</span>
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

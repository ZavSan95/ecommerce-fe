'use client';

import { useAdminLayout } from './AdminContext';
import { SidebarNav } from './SidebarNav';
import clsx from 'clsx';

export function Sidebar() {
  const { isCollapsed, isMobileOpen, closeMobile } = useAdminLayout();

  return (
    <aside
      className={clsx(
        'fixed z-50 inset-y-0 left-0 bg-slate-900 text-white transition-transform duration-200',
        'lg:translate-x-0',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        isCollapsed ? 'lg:w-20' : 'lg:w-64',
        'w-72'
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && <span className="font-bold">Ecommerce Admin</span>}
        <button onClick={closeMobile} className="lg:hidden">✕</button>
      </div>

      <SidebarNav />
    </aside>
  );
}

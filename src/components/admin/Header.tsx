'use client';

import { useAdminLayout } from './AdminContext';

export function Header() {
  const { openMobile, toggleCollapsed } = useAdminLayout();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <button onClick={openMobile} className="lg:hidden">☰</button>
        <button onClick={toggleCollapsed} className="hidden lg:block">☰</button>
        <span className="font-semibold">Panel Administrativo</span>
      </div>
      <div className="text-sm text-slate-500">Admin</div>
    </header>
  );
}

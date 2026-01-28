'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileOverlay } from './MobileOverlay';
import { AdminProvider, useAdminLayout } from './AdminContext';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <ShellInner>{children}</ShellInner>
    </AdminProvider>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, closeMobile } = useAdminLayout();

  useEffect(() => {
    closeMobile();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <div className="min-h-screen bg-slate-50">
      <MobileOverlay />
      <Sidebar />
      <div className={`transition-[padding] duration-200 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <Header />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

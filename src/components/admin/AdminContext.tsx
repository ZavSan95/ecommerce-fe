'use client';

import { createContext, useContext, useState } from 'react';

type AdminLayoutState = {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
};

const AdminContext = createContext<AdminLayoutState | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        isCollapsed,
        toggleCollapsed: () => setIsCollapsed(v => !v),
        isMobileOpen,
        openMobile: () => setIsMobileOpen(true),
        closeMobile: () => setIsMobileOpen(false),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminLayout() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdminLayout must be used inside AdminProvider');
  return ctx;
}

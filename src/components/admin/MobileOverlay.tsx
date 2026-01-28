'use client';

import clsx from 'clsx';
import { useAdminLayout } from './AdminContext';

export function MobileOverlay() {
  const { isMobileOpen, closeMobile } = useAdminLayout();

  return (
    <div
      onClick={closeMobile}
      className={clsx(
        'fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden',
        isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    />
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { AdminShell } from '@/components/admin/AdminShell';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, isInitialized } = useAppSelector(
    state => state.auth
  );

  // ⏳ Esperar a que auth esté listo
  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated || !user?.roles.includes('admin')) {
      router.replace('/');
    }
  }, [isInitialized, isAuthenticated, user, router]);

  // Mientras carga → no renderizar nada
  if (!isInitialized) {
    return null;
  }

  // No autorizado → tampoco renderizar
  if (!isAuthenticated || !user?.roles.includes('admin')) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}

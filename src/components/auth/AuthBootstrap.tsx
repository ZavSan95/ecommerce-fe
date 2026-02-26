'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setUser,
  clearAuth,
} from '@/store/auth/authSlice';
import { authMe } from '@/services/auth.service';

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authMe()
      .then(({ user }) => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(clearAuth());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return null; // o spinner

  return <>{children}</>;
}
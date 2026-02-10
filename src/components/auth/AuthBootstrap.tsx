'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setUser,
  clearAuth,
  setInitialized,
} from '@/store/auth/authSlice';
import { authMe } from '@/services/auth.service';
import { hasAuthCookie } from '@/utils/authCookies';

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  console.log('[AUTH BOOTSTRAP] mounted');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasAuthCookie()) {
      dispatch(clearAuth());
      dispatch(setInitialized());
      return;
    }

    authMe()
      .then(({ user }) => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(clearAuth());
      })
      .finally(() => {
        dispatch(setInitialized());
      });
  }, [dispatch]);

  return <>{children}</>;
}

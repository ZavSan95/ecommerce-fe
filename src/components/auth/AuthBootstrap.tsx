'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setUser,
  clearAuth,
} from '@/store/auth/authSlice';
import { authMe } from '@/services/auth.service';

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authMe()
      .then(({ user }) => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(clearAuth());
      });
  }, [dispatch]);

  return <>{children}</>;
}


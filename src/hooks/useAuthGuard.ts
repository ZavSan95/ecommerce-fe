'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export const useAuthGuard = (
  redirectPath?: string,
  minDelay = 500
) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);

      if (!isAuthenticated) {
        const redirect = redirectPath
          ? `?redirect=${redirectPath}`
          : '';

        router.replace(`/auth/login${redirect}`);
      }
    }, minDelay);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router, redirectPath, minDelay]);

  return {
    isAuthenticated,
    isChecking,
  };
};

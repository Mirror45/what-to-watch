'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Loading } from '@/components/Loading';
import { useAppSelector } from '@/store/hooks';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { token, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status !== 'idle' && status !== 'loading' && !token) {
      router.replace('/login');
    }
  }, [token, status, router]);

  if (status === 'idle' || status === 'loading') {
    return <Loading />;
  }

  if (!token) return null;

  return <>{children}</>;
}

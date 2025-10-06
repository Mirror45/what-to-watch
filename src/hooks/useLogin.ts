'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/auth';

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, error } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      const returnTo = searchParams.get('returnTo');
      router.push(returnTo || '/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return { login, status, error };
}

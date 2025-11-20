'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore, RootState } from '@/store';
import { restoreSession } from '@/store/slices/auth';

export default function StoreProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(restoreSession());
    }
  }, []);

  return <Provider store={storeRef.current!}>{children}</Provider>;
}

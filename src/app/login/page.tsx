import { Metadata } from 'next';

import { APP_URL } from '@/config';
import StoreProvider from '@/providers/StoreProvider';

import LoginContainer from './LoginContainer';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to add films to favorites and leave reviews.',
  alternates: {
    canonical: `${APP_URL}/login`,
  },
  openGraph: {
    title: 'Login — What to Watch',
    description: 'Authorization on "What to Watch". Access to favorite films and reviews.',
    url: `${APP_URL}/login`,
  },
};

export default function LoginPage() {
  return (
    <StoreProvider>
      <LoginContainer />
    </StoreProvider>
  );
}

import { JSX } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps): JSX.Element {
  return (
    <>
      <Header pageTitle="Sign In" showBreadcrumbs={false} showUserBlock={false} />
      <main className="user-page">{children}</main>
      <Footer />
    </>
  );
}

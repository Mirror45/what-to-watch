'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { useLogin } from '@/hooks/useLogin';

export default function LoginContainer() {
  const { login, status, error } = useLogin();

  return (
    <div className="user-page">
      <Header pageTitle="Sign in" showUserBlock={false} />

      <section className="sign-in user-page__content">
        <LoginForm onSubmit={login} loading={status === 'loading'} error={error} />
      </section>

      <Footer />
    </div>
  );
}

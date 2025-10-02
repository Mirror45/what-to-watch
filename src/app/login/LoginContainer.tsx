'use client';

import LoginForm from '@/components/LoginForm';
import { useLogin } from '@/hooks/useLogin';

export default function LoginContainer() {
  const { login, status, error } = useLogin();

  return (
    <section className="sign-in user-page__content">
      <LoginForm onSubmit={login} loading={status === 'loading'} error={error} />
    </section>
  );
}

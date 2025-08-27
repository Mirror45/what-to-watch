'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/auth';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { error, status } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      const returnTo = searchParams.get('returnTo');

      router.push(returnTo || '/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <section className="sign-in user-page__content">
      <form className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              id="user-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-email">
              Email address
            </label>
          </div>
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              id="user-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
              title="Password must include at least one letter and one number"
              required
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">
              Password
            </label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit" disabled={status === 'loading'}>
            Sign in
          </button>
          {error && <p className="login__error">{error}</p>}
        </div>
      </form>
    </section>
  );
}

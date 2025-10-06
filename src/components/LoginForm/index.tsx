'use client';

import React, { useState } from 'react';

import Button from './buttons/Button';
import TextInput from './inputs/TextInput';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
  error?: string | null;
}

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="sign-in__form" onSubmit={handleSubmit}>
      <div className="sign-in__fields">
        <TextInput
          id="user-email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={setEmail}
          required
        />
        <TextInput
          id="user-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          required
          pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
          title="Password must include at least one letter and one number"
        />
      </div>
      <div className="sign-in__submit">
        <Button type="submit" disabled={loading}>
          Sign in
        </Button>
        {error && <p className="login__error">{error}</p>}
      </div>
    </form>
  );
}

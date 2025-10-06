'use client';

import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ type = 'button', disabled, children }: ButtonProps) {
  return (
    <button className="sign-in__btn" type={type} disabled={disabled}>
      {children}
    </button>
  );
}

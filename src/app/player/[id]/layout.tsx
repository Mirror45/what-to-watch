import { JSX } from 'react';

interface PlayerLayoutProps {
  children: React.ReactNode;
}

export default function PlayerLayout({ children }: PlayerLayoutProps): JSX.Element {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

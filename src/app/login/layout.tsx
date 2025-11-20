import { JSX } from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <main>{children}</main>;
}

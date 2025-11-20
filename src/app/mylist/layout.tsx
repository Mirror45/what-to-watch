import { JSX } from 'react';

export default function MyListLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <main>{children}</main>;
}

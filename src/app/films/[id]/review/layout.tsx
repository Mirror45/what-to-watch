import { JSX } from 'react';

interface AddReviewLayoutProps {
  children: React.ReactNode;
}

export default function AddReviewLayout({ children }: AddReviewLayoutProps): JSX.Element {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

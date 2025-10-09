import { Metadata } from 'next';

import { APP_URL } from '@/config';

import HomeContainer from './HomeContainer';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Main page of the online cinema "What to Watch". Watch promo films, choose genres, and find your favorite movies.',
  alternates: {
    canonical: APP_URL,
  },
  openGraph: {
    title: 'Online cinema "What to Watch"',
    description:
      'Watch movies online at "What to Watch". Convenient genre filtering and movie selections.',
    url: APP_URL,
  },
};

export default function HomePage() {
  return <HomeContainer />;
}

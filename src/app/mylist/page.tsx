import { Metadata } from 'next';

import { APP_URL } from '@/config';

import MyListContainer from './MyListContainer';

export const metadata: Metadata = {
  title: 'My List',
  description: 'Your favorite movies on the online cinema "What to Watch".',
  alternates: {
    canonical: `${APP_URL}/my-list`,
  },
  openGraph: {
    title: 'My List — What to Watch',
    description: 'Watch your favorite movies online at "What to Watch".',
    url: `${APP_URL}/my-list`,
  },
};

export default function MyListPage() {
  return <MyListContainer />;
}

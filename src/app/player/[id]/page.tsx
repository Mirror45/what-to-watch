import { Metadata } from 'next';

import { API_URL, APP_URL } from '@/config';
import { ParamsWithId } from '@/types/pages';

import PlayerContainer from './PlayerContainer';

export async function generateMetadata({ params }: ParamsWithId): Promise<Metadata> {
  let film = null;

  try {
    const res = await fetch(`${API_URL}/films/${params.id}`);
    if (res.ok) {
      film = await res.json();
    }
  } catch {
    film = null;
  }

  if (!film) {
    return {
      title: 'Film not available',
      description: 'This film cannot be watched at the moment.',
    };
  }

  return {
    title: `Watch ${film.name} online`,
    description: `Watch ${film.name} online in high quality on "What to Watch".`,
    alternates: {
      canonical: `${APP_URL}/player/${film.id}`,
    },
    openGraph: {
      title: `Watch ${film.name} online`,
      description: film.description,
      url: `${APP_URL}/player/${film.id}`,
      images: [film.poster || '/og-image.jpg'],
    },
  };
}
export default function PlayerPage({ params }: ParamsWithId) {
  return <PlayerContainer filmId={params.id} />;
}

import { Metadata } from 'next';

import { API_URL, APP_URL } from '@/config';
import { ParamsWithId } from '@/types/pages';

import FilmContainer from './FilmContainer';

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
      title: 'Film not found',
      description: 'This film is not available in our database.',
    };
  }

  return {
    title: `${film.name}`,
    description: film.description,
    alternates: {
      canonical: `${APP_URL}/films/${film.id}`,
    },
    openGraph: {
      title: film.name,
      description: film.description,
      url: `${APP_URL}/films/${film.id}`,
      images: [film.poster || '/og-image.jpg'],
    },
  };
}

export default function FilmPage({ params }: ParamsWithId) {
  return <FilmContainer filmId={params.id} />;
}

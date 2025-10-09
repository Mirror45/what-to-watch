import { Metadata } from 'next';

import { API_URL, APP_URL } from '@/config';
import { ParamsWithId } from '@/types/pages';

import AddReviewContainer from './AddReviewContainer';

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
      description: 'This film is not available on "What to Watch".',
      alternates: {
        canonical: `${APP_URL}/films/${params.id}/review`,
      },
    };
  }

  return {
    title: `Add Review — ${film.name}`,
    description: `Leave your review for the film ${film.name} on "What to Watch".`,
    alternates: {
      canonical: `${APP_URL}/films/${film.id}/review`,
    },
    openGraph: {
      title: `Add Review — ${film.name}`,
      description: `Leave your review for the film ${film.name} on "What to Watch".`,
      url: `${APP_URL}/films/${film.id}/review`,
    },
  };
}

export default function AddReviewPage({ params }: ParamsWithId) {
  return <AddReviewContainer filmId={params.id} />;
}

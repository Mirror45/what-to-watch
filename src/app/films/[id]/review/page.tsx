import { Metadata } from 'next';
import { JSX } from 'react';

import { API_URL, APP_URL } from '@/config';
import StoreProvider from '@/providers/StoreProvider';
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

interface AddReviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function AddReviewPage(props: AddReviewPageProps): Promise<JSX.Element> {
  const params = await props.params;
  const { id } = params;

  return (
    <StoreProvider>
      <AddReviewContainer filmId={id} />
    </StoreProvider>
  );
}

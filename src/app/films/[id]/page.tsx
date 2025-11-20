import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JSX } from 'react';

import { API_URL, APP_URL } from '@/config';
import StoreProvider from '@/providers/StoreProvider';
import { makeStore } from '@/store';
import { fetchComments } from '@/store/slices/comments';
import { fetchFilmById, fetchSimilarFilms } from '@/store/slices/films';

import FilmContainer from './FilmContainer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;

  let film = null;

  try {
    const res = await fetch(`${API_URL}/films/${id}`);
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

export default async function FilmPage(props: PageProps): Promise<JSX.Element> {
  const params = await props.params;
  const { id } = params;

  const store = makeStore();

  try {
    await Promise.all([
      store.dispatch(fetchFilmById({ id })),
      store.dispatch(fetchSimilarFilms({ id })),
      store.dispatch(fetchComments({ id })),
    ]);
  } catch (error) {
    console.error('Failed to fetch film data on server:', error);
    notFound();
  }

  const preloadedState = store.getState();

  return (
    <StoreProvider preloadedState={preloadedState}>
      <FilmContainer />
    </StoreProvider>
  );
}

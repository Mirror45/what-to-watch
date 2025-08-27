'use client';

import { useParams } from 'next/navigation';
import { JSX, useEffect } from 'react';

import { AddReviewForm } from '@/components/AddReviewForm';
import { FilmCardFull } from '@/components/FilmCardFull';
import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentFilm } from '@/store/selectors/films/films';
import { fetchFilmById } from '@/store/slices/films/filmThunks';

export default function AddReviewPage(): JSX.Element {
  const params = useParams();
  const filmId = params.id as string;
  const dispatch = useAppDispatch();

  const film = useAppSelector(selectCurrentFilm);
  const isLoading = useAppSelector((state) => state.films.isCurrentFilmLoading);

  useEffect(() => {
    if (!film || film.id !== filmId) {
      dispatch(fetchFilmById({ id: filmId }));
    }
  }, [filmId, film, dispatch]);

  if (isLoading || !film) {
    return (
      <ProtectedRoute>
        <Loading />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor: film.backgroundColor }}
      >
        <Header
          pageTitle="Add review"
          showBreadcrumbs={true}
          filmId={film.id}
          filmTitle={film.name}
        />
        <FilmCardFull film={film} />
        <AddReviewForm />
      </section>
    </ProtectedRoute>
  );
}

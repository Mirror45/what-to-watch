'use client';

import { useEffect } from 'react';

import { FilmHero } from '@/components/FilmHero';
import { FilmInfo } from '@/components/FilmInfo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import { MoreLikeThis } from '@/components/MoreLikeThis';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentFilm } from '@/store/slices/films/filmSlice';
import { fetchFilmById } from '@/store/slices/films/filmThunks';

interface FilmContainerProps {
  filmId: string;
}

export default function FilmContainer({ filmId }: FilmContainerProps) {
  const dispatch = useAppDispatch();
  const { currentFilm, isCurrentFilmLoading, currentFilmError } = useAppSelector(
    (state) => state.films,
  );

  useEffect(() => {
    if (filmId) dispatch(fetchFilmById({ id: filmId }));

    return () => {
      dispatch(clearCurrentFilm());
    };
  }, [filmId, dispatch]);

  if (isCurrentFilmLoading) return <Loading />;
  if (currentFilmError) return <p>Error: {currentFilmError}</p>;
  if (!currentFilm) return <p>Film not found.</p>;

  return (
    <>
      <Header />
      <section className="film-card film-card--full">
        <FilmHero film={currentFilm} />
        <FilmInfo film={currentFilm} />
      </section>

      <div className="page-content">
        <MoreLikeThis />
      </div>
      <Footer />
    </>
  );
}

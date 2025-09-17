'use client';

import { useEffect } from 'react';

import { FilmCard } from '@/components/FilmCard';
import { MAX_SIMILAR_FILMS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentFilm, selectSimilarFilms } from '@/store/selectors/films/films';
import { fetchSimilarFilms } from '@/store/slices/films/filmThunks';

export function MoreLikeThis() {
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(selectCurrentFilm);
  const similarFilms = useAppSelector(selectSimilarFilms);

  useEffect(() => {
    if (currentFilm) {
      dispatch(fetchSimilarFilms({ id: currentFilm.id }));
    }
  }, [currentFilm, dispatch]);

  if (!similarFilms || similarFilms.length === 0) {
    return null;
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        {similarFilms
          .filter((film) => film && film.id !== currentFilm?.id)
          .slice(0, MAX_SIMILAR_FILMS)
          .map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
      </div>
    </section>
  );
}

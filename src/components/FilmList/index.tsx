'use client';

import { JSX } from 'react';

import { FilmCard } from '@/components/FilmCard';
import { useAppSelector } from '@/store/hooks';
import { selectFilteredFilms } from '@/store/selectors/films/films';

export function FilmList(): JSX.Element {
  const films = useAppSelector(selectFilteredFilms);

  if (!films || films.length === 0) {
    return <p className="catalog__empty-message">Movies not found.</p>;
  }

  return (
    <div className="catalog__films-list" role="list">
      {films
        .filter((film) => film)
        .map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
    </div>
  );
}

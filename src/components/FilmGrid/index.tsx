'use client';

import { FilmCard } from '@/components/FilmCard';
import { Film } from '@/types/film';

interface FilmGridProps {
  films: Film[];
}

export function FilmGrid({ films }: FilmGridProps) {
  return (
    <div className="catalog__films-list">
      {films
        .filter((film) => film)
        .map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
    </div>
  );
}

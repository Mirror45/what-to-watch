import { JSX } from 'react';

import { Film } from '@/types/film';

import { Background } from './Background';
import { Poster } from './Poster';

interface FilmCardFullProps {
  film: Film;
}

export function FilmCardFull({ film }: FilmCardFullProps): JSX.Element {
  return (
    <div className="film-card__header">
      <Background backgroundImage={film.backgroundImage} filmName={film.name} />
      <h1 className="visually-hidden">WTW</h1>
      <Poster posterImage={film.posterImage} filmName={film.name} />
    </div>
  );
}

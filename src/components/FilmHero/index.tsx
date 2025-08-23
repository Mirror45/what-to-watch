'use client';

import Image from 'next/image';

import { Film } from '@/types/film';

import { ActionButtons } from '../ActionButtons';

interface FilmHeroProps {
  film: Film;
}

export function FilmHero({ film }: FilmHeroProps) {
  return (
    <div className="film-card__hero">
      <div className="film-card__bg" style={{ height: '555px', width: '100%' }}>
        <Image
          src={film.backgroundImage}
          alt={film.name}
          fill
          priority
          style={{
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{film.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{film.genre}</span>
            <span className="film-card__year">{film.released}</span>
          </p>

          <ActionButtons film={film} showAddReview />
        </div>
      </div>
    </div>
  );
}

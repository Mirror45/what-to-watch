'use client';

import Image from 'next/image';
import { JSX, memo } from 'react';

import { Loading } from '@/components/Loading';
import { useAppSelector } from '@/store/hooks';
import { selectPromo } from '@/store/selectors/promo';

import { ActionButtons } from '../ActionButtons';

export const PromoFilm = memo((): JSX.Element => {
  const { data: film, isLoading } = useAppSelector(selectPromo);

  if (isLoading || !film) {
    return (
      <section className="film-card">
        <div className="film-card__bg">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="film-card">
      <div className="film-card__bg" style={{ height: '475px', width: '100%' }}>
        <Image
          src={film.backgroundImage}
          alt={film.name}
          fill
          style={{
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <Image src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <ActionButtons film={film} />
          </div>
        </div>
      </div>
    </section>
  );
});

PromoFilm.displayName = 'PromoFilm';

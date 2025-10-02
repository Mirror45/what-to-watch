'use client';

import { JSX, useEffect } from 'react';

import { FilmList } from '@/components/FilmList';
import { GenreList } from '@/components/GenreList';
import { PromoFilm } from '@/components/PromoFilm';
import { ShowMoreButton } from '@/components/ShowMoreButton';
import { useAppDispatch } from '@/store/hooks';
import { fetchFilms } from '@/store/slices/films';
import { fetchPromoFilm } from '@/store/slices/promo';

export default function HomeContainer(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilms());
    dispatch(fetchPromoFilm());
  }, [dispatch]);

  return (
    <>
      <PromoFilm />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />
          <FilmList />
          <ShowMoreButton />
        </section>
      </div>
    </>
  );
}

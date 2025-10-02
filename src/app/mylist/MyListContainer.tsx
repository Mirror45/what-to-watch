'use client';

import { JSX, useEffect } from 'react';

import { FilmGrid } from '@/components/FilmGrid';
import { Loading } from '@/components/Loading';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavoriteFilms, selectIsFavoriteLoading } from '@/store/selectors/films';
import { fetchFavoriteFilms } from '@/store/slices/films/filmThunks';

export default function MyListContainer(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(selectFavoriteFilms);
  const isLoading = useAppSelector(selectIsFavoriteLoading);

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <div className="user-page">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {isLoading ? <Loading /> : <FilmGrid films={favoriteFilms} />}
        </section>
      </div>
    </ProtectedRoute>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { JSX, useEffect } from 'react';

import { Loading } from '@/components/Loading';
import { VideoPlayer } from '@/components/VideoPlayer'; // Мы создадим этот компонент
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentFilm } from '@/store/selectors/films';
import { clearCurrentFilm } from '@/store/slices/films/filmSlice';
import { fetchFilmById } from '@/store/slices/films/filmThunks';

export default function PlayerPage(): JSX.Element {
  const params = useParams();
  const filmId = params.id as string;
  const dispatch = useAppDispatch();

  const film = useAppSelector(selectCurrentFilm);
  const isLoading = useAppSelector((state) => state.films.isCurrentFilmLoading);

  useEffect(() => {
    if (filmId) {
      dispatch(fetchFilmById({ id: filmId }));
    }
    return () => {
      dispatch(clearCurrentFilm());
    };
  }, [filmId, dispatch]);

  if (isLoading || !film) {
    return <Loading />;
  }

  return <VideoPlayer film={film} />;
}

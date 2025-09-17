'use client';

import { JSX } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAvailableGenres, selectGenre } from '@/store/selectors/films';
import { setGenre } from '@/store/slices/films/filmSlice';

export function GenreList(): JSX.Element {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectAvailableGenres);
  const selectedGenre = useAppSelector(selectGenre);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${
            genre === selectedGenre ? 'catalog__genres-item--active' : ''
          }`}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setGenre(genre));
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

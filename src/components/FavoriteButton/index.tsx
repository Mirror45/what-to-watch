'use client';

import { useFavoriteButton } from '@/hooks/useFavoriteButton';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthorized } from '@/store/selectors/auth/auth';
import { Film } from '@/types/film';

interface FavoriteButtonProps {
  film: Film;
}

export function FavoriteButton({ film }: FavoriteButtonProps) {
  const isAuth = useAppSelector(selectIsAuthorized);
  const { handleFavoriteClick } = useFavoriteButton(film);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteClick}>
      {isAuth && film.isFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list" />
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add" />
        </svg>
      )}
      <span>My list</span>
    </button>
  );
}

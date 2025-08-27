'use client';

import Link from 'next/link';
import { JSX } from 'react';

import { FavoriteButton } from '@/components/FavoriteButton';
import { PlayButton } from '@/components/PlayButton';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthorized } from '@/store/selectors/auth/auth';
import { Film } from '@/types/film';

interface ActionButtonsProps {
  film: Film;
  showAddReview?: boolean;
}

export function ActionButtons({ film, showAddReview = false }: ActionButtonsProps): JSX.Element {
  const isAuth = useAppSelector(selectIsAuthorized);

  return (
    <div className="film-card__buttons">
      <PlayButton filmId={film.id} />
      <FavoriteButton film={film} />

      {showAddReview && isAuth && (
        <Link href={`/films/${film.id}/review`} className="btn film-card__button">
          Add review
        </Link>
      )}
    </div>
  );
}

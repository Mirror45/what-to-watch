'use client';

import Link from 'next/link';
import { JSX } from 'react';

interface PlayButtonProps {
  filmId: string;
}

export function PlayButton({ filmId }: PlayButtonProps): JSX.Element {
  return (
    <Link href={`/player/${filmId}`} className="btn btn--play film-card__button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </Link>
  );
}

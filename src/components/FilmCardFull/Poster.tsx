// components/FilmCardFull/Poster.tsx
import Image from 'next/image';
import { JSX } from 'react';

interface PosterProps {
  posterImage: string;
  filmName: string;
}

export function Poster({ posterImage, filmName }: PosterProps): JSX.Element {
  return (
    <div className="film-card__poster film-card__poster--small">
      <Image src={posterImage} alt={`${filmName} poster`} width="218" height="327" />
    </div>
  );
}

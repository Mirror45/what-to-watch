import Image from 'next/image';
import { JSX } from 'react';

interface BackgroundProps {
  backgroundImage: string;
  filmName: string;
}

export function Background({ backgroundImage, filmName }: BackgroundProps): JSX.Element {
  return (
    <div className="film-card__bg">
      <Image src={backgroundImage} alt={filmName} fill priority style={{ objectFit: 'cover' }} />
    </div>
  );
}

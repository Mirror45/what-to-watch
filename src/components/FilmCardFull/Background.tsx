// components/FilmCardFull/Background.tsx
import Image from 'next/image';
import { JSX } from 'react';

// Принимаем пропсы для динамического отображения
interface BackgroundProps {
  backgroundImage: string;
  filmName: string;
}

export function Background({ backgroundImage, filmName }: BackgroundProps): JSX.Element {
  return (
    <div className="film-card__bg">
      {/* Используем пропсы вместо статичных данных */}
      <Image src={backgroundImage} alt={filmName} fill priority style={{ objectFit: 'cover' }} />
    </div>
  );
}

'use client';

import { Fragment } from 'react';

type RatingStarsProps = {
  rating: number;
  onChange: (value: number) => void;
};

export function RatingStars({ rating, onChange }: RatingStarsProps) {
  return (
    <div className="rating__stars">
      {Array.from({ length: 10 }, (_, i) => 10 - i).map((value) => (
        <Fragment key={value}>
          <input
            className="rating__input"
            id={`star-${value}`}
            type="radio"
            name="rating"
            value={value}
            checked={rating === value}
            onChange={() => onChange(value)}
          />
          <label className="rating__label" htmlFor={`star-${value}`}>
            Rating {value}
          </label>
        </Fragment>
      ))}
    </div>
  );
}

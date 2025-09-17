'use client';

import { JSX } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectHasMore } from '@/store/selectors/films';
import { showMore } from '@/store/slices/films/filmSlice';

export function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasMore = useAppSelector(selectHasMore);

  if (!hasMore) {
    return <></>;
  }

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(showMore())}>
        Show more
      </button>
    </div>
  );
}

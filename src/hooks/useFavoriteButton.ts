'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsAuthorized } from '@/store/selectors/auth/auth';
import { updateFavoriteStatus } from '@/store/slices/films/filmThunks';
import { Film } from '@/types/film';

export function useFavoriteButton(film: Film | null) {
  const isAuth = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleFavoriteClick = () => {
    if (!isAuth) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (film) {
      const newStatus = film.isFavorite ? 0 : 1;
      dispatch(updateFavoriteStatus({ id: film.id, status: newStatus }));
    }
  };

  return { handleFavoriteClick };
}

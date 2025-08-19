import { RootState } from '@/store/index';
import { Film } from '@/types/film';

export const selectAllFilms = (state: RootState) => state.films.all;
export const selectGenre = (state: RootState) => state.films.selectedGenre;
export const selectShownCount = (state: RootState) => state.films.shownCount;

export const selectFilteredFilms = (state: RootState) => {
  const genre = state.films.selectedGenre;
  const films = state.films.all;
  const filtered = genre === 'All genres' ? films : films.filter((f) => f.genre === genre);
  return filtered.slice(0, state.films.shownCount);
};

export const selectAvailableGenres = (state: RootState) => {
  const allGenres = state.films.all.map((f) => f.genre);
  const uniqueGenres = Array.from(new Set(allGenres));
  return ['All genres', ...uniqueGenres.slice(0, 9)];
};

export const selectHasMore = (state: RootState) => {
  const genre = state.films.selectedGenre;
  const filtered =
    genre === 'All genres' ? state.films.all : state.films.all.filter((f) => f.genre === genre);
  return state.films.shownCount < filtered.length;
};

export const selectCurrentFilm = (state: RootState): Film | null => state.films.currentFilm;
export const selectSimilarFilms = (state: RootState): Film[] => state.films.similarFilms;

export const selectFavoriteFilms = (state: RootState): Film[] => state.films.favoriteFilms;
export const selectIsFavoriteLoading = (state: RootState): boolean => state.films.isFavoriteLoading;

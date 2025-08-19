import { Film } from '@/types/film';

export interface FilmsState {
  all: Film[];
  currentFilm: Film | null;
  similarFilms: Film[];
  favoriteFilms: Film[];
  isLoading: boolean;
  isCurrentFilmLoading: boolean;
  isSimilarFilmsLoading: boolean;
  isFavoriteLoading: boolean;
  error: string | null;
  currentFilmError: string | null;
  selectedGenre: string;
  shownCount: number;
}

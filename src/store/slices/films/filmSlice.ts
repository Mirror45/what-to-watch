import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Film } from '@/types/film';

import {
  fetchFavoriteFilms,
  fetchFilmById,
  fetchFilms,
  fetchSimilarFilms,
  updateFavoriteStatus,
} from './filmThunks';
import { FilmsState } from './filmTypes';

const SLICE_NAME_FILMS = 'films';
const INITIAL_SHOWN_COUNT = 8;

const initialState: FilmsState = {
  all: [],
  currentFilm: null, // <-- Добавлено
  similarFilms: [], // <-- Добавлено
  favoriteFilms: [], // <-- Добавлено
  isLoading: false,
  isCurrentFilmLoading: false, // <-- Добавлено
  isSimilarFilmsLoading: false, // <-- Добавлено
  isFavoriteLoading: false, // <-- Добавлено
  error: null,
  currentFilmError: null, // <-- Добавлено
  selectedGenre: 'All genres',
  shownCount: INITIAL_SHOWN_COUNT,
};

const filmsSlice = createSlice({
  name: SLICE_NAME_FILMS,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
      state.shownCount = INITIAL_SHOWN_COUNT;
    },
    showMore: (state) => {
      state.shownCount += INITIAL_SHOWN_COUNT;
    },
    // Редьюсер для очистки состояния текущего фильма при уходе со страницы
    clearCurrentFilm: (state) => {
      // <-- Добавлено
      state.currentFilm = null;
      state.currentFilmError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to load films';
      })
      // Кейсы для fetchFilmById <-- Добавлено
      .addCase(fetchFilmById.pending, (state) => {
        state.isCurrentFilmLoading = true;
        state.currentFilmError = null;
      })
      .addCase(fetchFilmById.fulfilled, (state, action: PayloadAction<Film>) => {
        state.isCurrentFilmLoading = false;
        state.currentFilm = action.payload;
      })
      .addCase(fetchFilmById.rejected, (state, action) => {
        state.isCurrentFilmLoading = false;
        state.currentFilmError = action.payload?.message || 'Failed to load film';
      })
      // Кейсы для fetchSimilarFilms <-- Добавлено
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.isSimilarFilmsLoading = false;
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.isSimilarFilmsLoading = false;
        // Можно добавить обработку ошибки, если нужно
      })
      // Загрузка избранных фильмов
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.isFavoriteLoading = false;
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.isFavoriteLoading = false;
      })
      // Обновление статуса фильма
      .addCase(updateFavoriteStatus.fulfilled, (state, action: PayloadAction<Film>) => {
        const updatedFilm = action.payload;
        // Обновляем фильм в общем списке
        state.all = state.all.map((film) => (film.id === updatedFilm.id ? updatedFilm : film));
        // Обновляем фильм в текущем открытом
        if (state.currentFilm && state.currentFilm.id === updatedFilm.id) {
          state.currentFilm = updatedFilm;
        }
        // Обновляем список избранных
        if (updatedFilm.isFavorite) {
          state.favoriteFilms.push(updatedFilm);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((film) => film.id !== updatedFilm.id);
        }
      });
  },
});

export const { setGenre, showMore, clearCurrentFilm } = filmsSlice.actions;
export default filmsSlice.reducer;

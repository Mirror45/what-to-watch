import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_SHOWN_COUNT, SLICE_NAME_FILMS } from '@/constants';
import { Film } from '@/types/film';

import {
  fetchFavoriteFilms,
  fetchFilmById,
  fetchFilms,
  fetchSimilarFilms,
  updateFavoriteStatus,
} from './filmThunks';
import { FilmsState } from './filmTypes';

const initialState: FilmsState = {
  all: [],
  currentFilm: null,
  similarFilms: [],
  favoriteFilms: [],
  isLoading: false,
  isCurrentFilmLoading: false,
  isSimilarFilmsLoading: false,
  isFavoriteLoading: false,
  error: null,
  currentFilmError: null,
  similarFilmsError: null,
  favoriteFilmsError: null,
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
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
      state.currentFilmError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Films list
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
      // Current film
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
      // Similar films
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.isSimilarFilmsLoading = false;
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilms.rejected, (state, action) => {
        state.isSimilarFilmsLoading = false;
        state.similarFilmsError = action.payload?.message ?? 'Failed to load similar films';
      })
      // Favorite films
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.isFavoriteLoading = false;
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state, action) => {
        state.isFavoriteLoading = false;
        state.favoriteFilmsError = action.payload?.message ?? 'Failed to load favorite films';
      })
      // Update favorite status
      .addCase(updateFavoriteStatus.fulfilled, (state, action: PayloadAction<Film>) => {
        const updatedFilm = action.payload;
        state.all = state.all.map((film) => (film.id === updatedFilm.id ? updatedFilm : film));
        if (state.currentFilm && state.currentFilm.id === updatedFilm.id) {
          state.currentFilm = updatedFilm;
        }
        if (updatedFilm.isFavorite && !state.favoriteFilms.find((f) => f.id === updatedFilm.id)) {
          state.favoriteFilms.push(updatedFilm);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter((film) => film.id !== updatedFilm.id);
        }
      });
  },
});

export const { setGenre, showMore, clearCurrentFilm } = filmsSlice.actions;
export default filmsSlice.reducer;

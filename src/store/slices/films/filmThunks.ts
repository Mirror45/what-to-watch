import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkError } from '@/types/errors';
import { Film } from '@/types/film';
import { api, handleError } from '@/utils';

export const fetchFilms = createAsyncThunk<Film[], void, { rejectValue: ThunkError }>(
  'films/fetchFilms',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<Film[]>('/films');
      return data;
    } catch (error) {
      handleError(error, 'Failed to load films');
      return thunkAPI.rejectWithValue({ message: 'Failed to load films' });
    }
  },
);

export const fetchFilmById = createAsyncThunk<Film, { id: string }, { rejectValue: ThunkError }>(
  'films/fetchFilmById',
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await api.get<Film>(`/films/${id}`);
      return data;
    } catch (error) {
      handleError(error, 'Failed to load film');
      return thunkAPI.rejectWithValue({ message: 'Failed to load film' });
    }
  },
);

export const fetchSimilarFilms = createAsyncThunk<
  Film[],
  { id: string },
  { rejectValue: ThunkError }
>('films/fetchSimilarFilms', async ({ id }, thunkAPI) => {
  try {
    const { data } = await api.get<Film[]>(`/films/${id}/similar`);
    return data;
  } catch (error) {
    handleError(error, 'Failed to load similar films');
    return thunkAPI.rejectWithValue({ message: 'Failed to load similar films' });
  }
});

export const fetchFavoriteFilms = createAsyncThunk<Film[], void, { rejectValue: ThunkError }>(
  'films/fetchFavoriteFilms',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<Film[]>('/favorite');
      return data;
    } catch (error) {
      handleError(error, 'Failed to load favorite films');
      return thunkAPI.rejectWithValue({ message: 'Failed to load favorite films' });
    }
  },
);

export const updateFavoriteStatus = createAsyncThunk<
  Film,
  { id: string; status: number },
  { rejectValue: ThunkError }
>('films/updateFavoriteStatus', async ({ id, status }, thunkAPI) => {
  try {
    const { data } = await api.post<Film>(`/favorite/${id}/${status}`);
    return data;
  } catch (error) {
    handleError(error, 'Failed to update favorite status');
    return thunkAPI.rejectWithValue({ message: 'Failed to update favorite status' });
  }
});

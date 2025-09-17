import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkError } from '@/types/errors';
import { Film } from '@/types/film';
import { api, handleError } from '@/utils';

export const fetchPromoFilm = createAsyncThunk<Film, void, { rejectValue: ThunkError }>(
  'films/fetchPromoFilm',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get<Film>('/promo');
      return data;
    } catch (error) {
      handleError(error, 'Failed to load promo film');
      return thunkAPI.rejectWithValue({ message: 'Failed to load promo film' });
    }
  },
);

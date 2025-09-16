import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAME_PROMO } from '@/constants';

import { updateFavoriteStatus } from '../films/filmThunks';
import { fetchPromoFilm } from './promoThunks';
import { PromoState } from './promoTypes';

const initialState: PromoState = {
  data: null,
  isLoading: false,
  error: null,
};

const promoSlice = createSlice({
  name: SLICE_NAME_PROMO,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPromoFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to load promo film';
      })
      .addCase(updateFavoriteStatus.fulfilled, (state, action) => {
        const updatedFilm = action.payload;
        if (state.data && state.data.id === updatedFilm.id) {
          state.data = updatedFilm;
        }
      });
  },
});

export default promoSlice.reducer;

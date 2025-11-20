import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { commentsReducer } from './slices/comments';
import { filmReducer } from './slices/films';
import { promoReducer } from './slices/promo';

const rootReducer = combineReducers({
  auth: authReducer,
  films: filmReducer,
  promo: promoReducer,
  comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

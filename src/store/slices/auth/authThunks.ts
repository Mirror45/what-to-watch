import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkError } from '@/types/errors';
import { api, getToken, handleError, removeToken, setToken } from '@/utils';

import { AuthInfo, LoginPayload } from './authTypes';

export const loginUser = createAsyncThunk<AuthInfo, LoginPayload, { rejectValue: ThunkError }>(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await api.post<AuthInfo>('/login', { email, password });
      setToken(data.token);
      return data;
    } catch (error) {
      handleError(error, 'Login failed');
      return thunkAPI.rejectWithValue({ message: 'Login failed' });
    }
  },
);

export const restoreSession = createAsyncThunk<AuthInfo, void, { rejectValue: ThunkError }>(
  'auth/restoreSession',
  async (_, thunkAPI) => {
    const token = getToken();
    if (!token) return thunkAPI.rejectWithValue({ message: 'No token found' });

    try {
      const { data } = await api.get<AuthInfo>('/login');
      return { ...data, token };
    } catch (error) {
      handleError(error, 'Session restore failed');
      return thunkAPI.rejectWithValue({ message: 'Session restore failed' });
    }
  },
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: ThunkError }>(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await api.delete('/logout');
      removeToken();
    } catch (error) {
      handleError(error, 'Logout failed');
      return thunkAPI.rejectWithValue({ message: 'Logout failed' });
    }
  },
);

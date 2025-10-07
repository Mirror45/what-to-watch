import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { API_URL } from '@/config';

import { getToken } from './token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      const errorMessage = error.response?.data?.error;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error('Something went wrong');
      }
      return Promise.reject(error);
    },
  );

  return api;
};

export const api = createAPI();

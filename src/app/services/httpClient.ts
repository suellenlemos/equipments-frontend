import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { localStorageKeys } from '../config/localStorageKeys';

export interface RequestConfig {
  headers: {
    common: Record<string, string>;
  };
}

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    const isUnauthorized = error.response && error.response.status === 401;

    const isSessionExpired = !accessToken || isUnauthorized;

    const itemsToRemove = [
      localStorageKeys.USER_INFO,
      localStorageKeys.ACCESS_TOKEN,
    ];

    const removeLocalStorageItems = (items: string[]) => {
      items.forEach((item) => {
        localStorage.removeItem(item);
      });
    };

    if (isSessionExpired) {
      toast.error('Your session has expired, please log in again.');
      removeLocalStorageItems(itemsToRemove);
      setTimeout(() => {
        window.location.pathname = '/login';
      }, 3000);
    }

    return Promise.reject(error);
  }
);

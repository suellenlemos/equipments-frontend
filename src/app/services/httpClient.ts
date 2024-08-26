import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

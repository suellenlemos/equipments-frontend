import { httpClient } from '../httpClient';

export const validateToken = async () => {
  const response = await httpClient.get('/validatetoken');
  return response;
};

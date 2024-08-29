import { AxiosResponse } from 'axios';
import { RegisterFormData } from '../../entities/RegisterFormData';
import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

export const register = async (formData: RegisterFormData) => {
  let result: AxiosResponse<User>;
  try {
    result = await httpClient.post('/register', formData);
  } catch (err: any) {
    const { message } = err.response.data;
    throw Error(message);
  }

  const { data } = result;

  return data;
};

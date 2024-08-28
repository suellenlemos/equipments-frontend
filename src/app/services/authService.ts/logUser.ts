import { AxiosResponse } from 'axios';

import { SignInFormData } from '../../entities/SignInFormData';
import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

export interface SignInResponse {
  token: string;
  user: User;
}

export const logUser = async (formData: SignInFormData) => {
  let result: AxiosResponse<SignInResponse>;
  try {
    result = await httpClient.post('/login', formData);
  } catch (err: any) {
    const { message } = err.response.data;
    throw Error(message);
  }

  const { data } = result;

  return data;
};

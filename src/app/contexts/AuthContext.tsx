import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useCallback, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { localStorageKeys } from '../config/localStorageKeys';
import { User } from '../entities/User';
import { httpClient } from '../services/httpClient';

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signIn: (params: SignInParams) => Promise<SignInResponse>;
  signOut: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | undefined>(
    localStorageKeys.USER_INFO,
    undefined
  );

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    const storedUserInfo = localStorage.getItem(localStorageKeys.USER_INFO);

    return !!storedAccessToken && !!storedUserInfo;
  });

  const signIn = useCallback(async (params: SignInParams) => {
    let result: AxiosResponse<SignInResponse>;
    try {
      result = await httpClient.post('/login', params);
    } catch (err: any) {
      const { message } = err.response.data;
      throw Error(message);
    }

    const { data } = result;

    setUser(data.user);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data.token);
    setSignedIn(true);

    return data;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.USER_INFO);
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        user,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

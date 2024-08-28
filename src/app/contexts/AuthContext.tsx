import { createContext, ReactNode, useCallback, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { localStorageKeys } from '../config/localStorageKeys';
import { User } from '../entities/User';

import { SignInFormData } from '../entities/SignInFormData';
import { authService } from '../services/authService.ts';

export interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signIn: (formData: SignInFormData) => Promise<void>;
  signOut: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | undefined>(
    localStorageKeys.USER_DATA,
    undefined
  );

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    const storedUserInfo = localStorage.getItem(localStorageKeys.USER_DATA);

    return !!storedAccessToken && !!storedUserInfo;
  });

  const signIn = useCallback(async (formData: SignInFormData) => {
    const result = await authService.logUser(formData);
    setUser(result.user);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, result.token);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.USER_DATA);
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

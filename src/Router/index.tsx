import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../view/pages';

import { AuthLayout } from '../view/layouts/AuthLayout';
import { MainLayout } from '../view/layouts/MainLayout';
import { Login } from '../view/pages/Login';
import { AuthGuard } from './AuthGuard';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

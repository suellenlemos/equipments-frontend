import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../view/pages';

import { MainLayout } from '../view/layouts/MainLayout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

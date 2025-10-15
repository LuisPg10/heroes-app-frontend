import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router';

import { HomePage } from '@/heroes/pages/home/HomePage';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { AdminLayout } from '@/admin/layouts/AdminLayout';

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

// export const appRouter = createBrowserRouter([

export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'heroes/:slugId',
        element: <HeroPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: '*',
        // element: <h1>404</h1>,
        element: <Navigate to="/" />,
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);

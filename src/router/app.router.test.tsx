import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from 'react-router';
import { appRouter } from './app.router';

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => <div data-testid="home-page">HomePage</div>,
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  HeroPage: () => {
    const { slugId = '' } = useParams();

    return <div data-testid="hero-page">HeroPage - {slugId}</div>;
  },
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid="search-page"></div>,
}));

describe('appRouter', () => {
  test('should be configured as expected', () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test('should render home page at root path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });

  test('should render hero page at /heroes/:slugId path', () => {
    const slugId = 'clark-kent';
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: [`/heroes/${slugId}`],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('hero-page').innerHTML).toContain(slugId);
  });

  test('sould render search page at /search path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/search'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('search-page')).toBeDefined();
  });

  test('sould redirect to home page for unknown routes', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/other-rare-page'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });
});

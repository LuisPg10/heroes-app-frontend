import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import SearchPage from './SearchPage';
import type { Hero } from '@/heroes/types/hero.interface';

vi.mock('@/heroes/actions/search-heroes.action');
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotron: () => <div>CustomJumbotron</div>,
}));

vi.mock('@/components/custom/CustomBreadcrumbs', () => ({
  CustomBreadcrumbs: () => <div>CustomBreadcrumbs</div>,
}));

vi.mock('./ui/SearchControls', () => ({
  SearchControls: () => <div>SearchControls</div>,
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ({ heroes = [] }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <p key={hero.id}>{hero.name}</p>
      ))}
    </div>
  ),
}));

const queryCient = new QueryClient();

const renderSearchPage = (initialEntries?: string[]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryCient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render SearchPage with defautl values', () => {
    renderSearchPage();

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: undefined,
    });
  });

  test('should match to snapshot', () => {
    const { container } = renderSearchPage();

    expect(container).toMatchSnapshot();
  });

  test('should call search action with name parameter', () => {
    renderSearchPage(['/search?name=superman']);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: undefined,
    });
  });

  test('should call search action with strength parameter', () => {
    renderSearchPage(['/search?strength=6']);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: '6',
    });
  });

  test('should call search action with name and strength parameter', () => {
    renderSearchPage(['/search?name=batman&strength=8']);

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: 'batman',
      strength: '8',
    });
  });

  test('should render HeroGrid with search results', async () => {
    const mockHeroes = [
      { id: '1', name: 'Clark Kent' } as unknown as Hero,
      { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
    ];

    mockSearchHeroesAction.mockResolvedValue(mockHeroes);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });
  });
});

import { heroApi } from '../api/hero.api';
import { heroResponseToLocalHero } from '../mappers/heroes.mapper';
import type { Hero } from '../types/hero.interface';

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async (
  searchParams: Options
): Promise<Hero[]> => {
  const allEmptyParams = !Object.values(searchParams).some((param) => param);

  if (allEmptyParams) return [];

  const { data } = await heroApi.get<Hero[]>('/search', {
    params: searchParams,
  });

  return data.map((hero) => heroResponseToLocalHero(hero));
};

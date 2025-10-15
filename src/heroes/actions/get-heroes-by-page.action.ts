import type { HeroesResponse } from '../types/get-heroes.response';
import { heroesResponseToLocalData } from '../mappers/heroes.mapper';
import { heroApi } from '../api/hero.api';

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = 'all'
): Promise<HeroesResponse> => {
  const finalPage = isNaN(page) ? 1 : page;
  const finalLimit = isNaN(limit) ? 6 : limit;

  const { data } = await heroApi.get<HeroesResponse>('/', {
    params: {
      limit: finalLimit,
      offset: (finalPage - 1) * limit,
      category,
    },
  });

  return heroesResponseToLocalData(data);
};

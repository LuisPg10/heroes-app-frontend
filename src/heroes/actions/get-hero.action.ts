import type { Hero } from '../types/hero.interface';
import { heroResponseToLocalHero } from '../mappers/heroes.mapper';
import { heroApi } from '../api/hero.api';

export const getHeroAction = async (slugId: string): Promise<Hero> => {
  const { data } = await heroApi.get<Hero>(`/${slugId}`);

  return heroResponseToLocalHero(data);
};

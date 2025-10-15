import type { Hero } from '../types/hero.interface';
import type { HeroesResponse } from '../types/get-heroes.response';

const BASE_URL = import.meta.env.VITE_API_URL;

export const heroesResponseToLocalData = (
  data: HeroesResponse
): HeroesResponse => {
  const heroes = data.heroes.map((hero) => heroResponseToLocalHero(hero));

  return {
    ...data,
    heroes,
  };
};

export const heroResponseToLocalHero = (hero: Hero) => {
  return {
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  };
};

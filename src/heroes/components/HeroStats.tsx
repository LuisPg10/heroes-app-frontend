import { use } from 'react';
import { Heart, Trophy, Users, Zap } from 'lucide-react';

import { useHeroSummary } from '../hooks/useHeroSummary';

import { FavoriteHeroContext } from '../context/FavoriteHeroContext';
import { Badge } from '@/components/ui/badge';
import { HeroStatCard } from './HeroStatCard';

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);

  if (!summary) return <div>Cargando...</div>;

  const favoritePercentage = (
    (favoriteCount / summary.totalHeroes) *
    100
  ).toFixed(2);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard
        title="Total de personajes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} héroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} villanos
          </Badge>
        </div>
      </HeroStatCard>

      {/* TODO: we need to calculate this value */}
      <HeroStatCard
        title="Favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div
          data-testid="favorite-count"
          className="text-2xl font-bold text-red-600"
        >
          {favoriteCount}
        </div>
        <p
          data-testid="favorite-percentage"
          className="text-xs text-muted-foreground"
        >
          {favoritePercentage}% del total
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Fuerte"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Fuerza: {summary?.strongestHero.strength}/10
        </p>
      </HeroStatCard>

      <HeroStatCard
        title="Inteligente"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Inteligencia: {summary?.smartestHero.intelligence}/10
        </p>
      </HeroStatCard>
    </div>
  );
};

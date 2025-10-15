import { use } from 'react';

import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';

import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';
import { useSearchHeroParams } from '@/heroes/hooks/useSearchHeroParams';

import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';

export const HomePage = () => {
  const { favoriteCount, favorites } = use(FavoriteHeroContext);
  const { category, limit, page, selectedTab, setSearchParams } =
    useSearchHeroParams();

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Universo de SuperHéroes"
        description="Descubre, explora y administra superhéroes y villanos"
      />

      {/* BreadCrumbs */}
      <CustomBreadcrumbs currentPage="Super Héroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              })
            }
            value="all"
          >
            All Characters ({summary?.totalHeroes})
          </TabsTrigger>

          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'favorites');
                return prev;
              })
            }
            value="favorites"
            className="flex items-center gap-2"
          >
            Favorites ({favoriteCount})
          </TabsTrigger>

          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'heroes');
                prev.set('category', 'hero');
                prev.set('page', '1');
                return prev;
              })
            }
            value="heroes"
          >
            Heroes ({summary?.heroCount})
          </TabsTrigger>

          <TabsTrigger
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('tab', 'villains');
                prev.set('category', 'villain');
                prev.set('page', '1');
                return prev;
              })
            }
            value="villains"
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* Muestra todos los personajes */}
          <HeroGrid heroes={heroesResponse?.heroes} />
        </TabsContent>

        <TabsContent value="favorites">
          {/* Muestra todos los personajes favoritos*/}
          <HeroGrid heroes={favorites} />
        </TabsContent>

        <TabsContent value="heroes">
          {/* Muestra todos los heroes */}
          <HeroGrid heroes={heroesResponse?.heroes} />
        </TabsContent>

        <TabsContent value="villains">
          {/* Muestra todos los villanos */}
          <HeroGrid heroes={heroesResponse?.heroes} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}

      {selectedTab !== 'favorites' && (
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      )}
    </>
  );
};

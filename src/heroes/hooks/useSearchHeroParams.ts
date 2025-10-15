import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export const useSearchHeroParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: 'all' });

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 6;
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];

    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  return {
    //* State
    category,
    limit,
    page,
    selectedTab,

    //*Methods
    setSearchParams,
  };
};

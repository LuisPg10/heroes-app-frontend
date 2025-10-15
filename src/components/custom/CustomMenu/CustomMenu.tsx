import { Link, useLocation } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import './CustomMenu.css';

export const CustomMenu = () => {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenu className="mb-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            active={isActive('/')}
            className="navigation-menu-link rounded-md p-2"
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            active={isActive('/search')}
            className="navigation-menu-link rounded-md p-2"
          >
            <Link to="/search">Buscar superhéroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

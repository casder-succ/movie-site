import {
  IconCompass,
  IconFlame,
  IconHome,
  IconLogout,
  IconRefresh,
} from '@tabler/icons-react';

import { RoutePath } from 'routes';

import { INavigationGroup, NavigationItem, NavigationSource } from './types';

const MENU_GROUP: NavigationItem[] = [
  {
    title: 'Home',
    href: RoutePath.Home,
    Icon: IconHome,
  },
  {
    title: 'Discovery',
    href: RoutePath.Discovery,
    Icon: IconCompass,
  },
  {
    title: 'Fresh movies',
    href: RoutePath.FreshMovies,
    Icon: IconRefresh,
  },
  {
    title: 'Trending now',
    href: RoutePath.TrendingNow,
    Icon: IconFlame,
  },
];

const GENERAL_GROUP: NavigationItem[] = [
  {
    title: 'Login',
    href: RoutePath.SignIn,
    Icon: IconLogout,
  },
];

export const NAVIGATION_GROUPS: INavigationGroup[] = [
  {
    title: 'Menu',
    items: MENU_GROUP,
  },
  {
    title: 'Popular genres',
    source: NavigationSource.GENRES,
  },
  {
    title: 'General',
    items: GENERAL_GROUP,
  },
];

import {
  IconCompass,
  IconFlame,
  IconFriends,
  IconHome,
  IconLogout,
  IconMoodSmile,
  IconRefresh, IconUserPlus, IconWand,
} from '@tabler/icons-react';

import { RoutePath } from 'routes';

import { NavigationGroup, NavigationItem } from './types';

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

const POPULAR_GROUP: NavigationItem[] = [
  {
    title: 'Comedy',
    href: RoutePath.Genre.replace('[genre]', 'comedy'),
    Icon: IconMoodSmile,
  },
  {
    title: 'Cartoons',
    href: RoutePath.Genre.replace('[genre]', 'cartoons'),
    Icon: IconFriends,
  },
  {
    title: 'Fantasy',
    href: RoutePath.Genre.replace('[genre]', 'fantasy'),
    Icon: IconWand,
  },
  {
    title: 'Biography',
    href: RoutePath.Genre.replace('[genre]', 'biography'),
    Icon: IconUserPlus,
  },
];

const GENERAL_GROUP: NavigationItem[] = [
  {
    title: 'Login',
    href: RoutePath.SignIn,
    Icon: IconLogout,
  },
];

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    title: 'Menu',
    items: MENU_GROUP,
  },
  {
    title: 'Popular genres',
    items: POPULAR_GROUP,
  },
  {
    title: 'General',
    items: GENERAL_GROUP,
  },
];

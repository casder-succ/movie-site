import { FC } from 'react';

import NavigationGroup from 'components/NavigationGroup';

import { RoutePath } from 'routes';

import { genresApi } from 'resources/genres';

import type { NavigationItem } from 'pages/_app/PageConfig/MainLayout/Navbar/types';

const GenresNavigationGroup: FC = () => {
  const { data, isLoading, isFetching } = genresApi.useList();

  const navigationItems = (data?.genres ?? []).map((item): NavigationItem => ({
    title: item.name,
    Icon: item.icon,
    href: RoutePath.Genre.replace('[slug]', item.slug),
  }));

  return (
    <NavigationGroup
      title="Popular genres"
      items={navigationItems}
      loading={isLoading || isFetching}
    />
  );
};

export default GenresNavigationGroup;

import { FC } from 'react';

import { AppShell, Stack } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import NavigationGroup from 'components/NavigationGroup';

import { NAVIGATION_GROUPS } from './constants';

import classes from './Navbar.module.css';
import { INavigationGroup, NavigationSource } from './types';
import GenresNavigationGroup from '../../../../../components/GenresNavigationGroup';

type NavbarProps = {
  opened: boolean;
};

const Navbar: FC<NavbarProps> = ({ opened }) => {
  const { width } = useViewportSize();

  const getNavigationItem = (group: INavigationGroup) => {
    switch (group.source) {
      case NavigationSource.GENRES: {
        return <GenresNavigationGroup key={group.title} />;
      }
      default: {
        return (
          <NavigationGroup
            title={group.title}
            items={group.items}
            key={group.title}
          />
        );
      }
    }
  };

  return (
    <AppShell.Navbar
      mod={{ opened: opened || width >= 578 }}
      className={classes.navbar}
    >
      <Stack>
        {NAVIGATION_GROUPS
          .map((group) => getNavigationItem(group))}
      </Stack>
    </AppShell.Navbar>
  );
};

export default Navbar;

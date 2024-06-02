import { FC } from 'react';

import { AppShell, Stack } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import NavigationGroup from 'components/NavigationGroup';

import { NAVIGATION_GROUPS } from './constants';

import classes from './Navbar.module.css';

type NavbarProps = {
  opened: boolean;
};

const Navbar: FC<NavbarProps> = ({ opened }) => {
  const { width } = useViewportSize();

  return (
    <AppShell.Navbar
      mod={{ opened: opened || width >= 578 }}
      className={classes.navbar}
    >
      <Stack>
        {NAVIGATION_GROUPS
          .filter(({ items }) => items.length > 0)
          .map((group) => (
            <NavigationGroup
              title={group.title}
              items={group.items}
              key={group.title}
            />
          ))}
      </Stack>
    </AppShell.Navbar>
  );
};

export default Navbar;

import { FC, ReactNode } from 'react';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from './Header';
import Navbar from './Navbar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [navbarOpened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{
        height: 80,
      }}
      navbar={{
        width: {
          xs: 250,
          sm: 250,
          lg: 250,
        },
        breakpoint: 'xs',
        collapsed: {
          mobile: !navbarOpened,
        },
      }}
      padding="md"
    >
      <Header
        opened={navbarOpened}
        onMenuClick={toggle}
      />

      <Navbar opened={navbarOpened} />

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;

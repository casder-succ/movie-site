import { FC } from 'react';

import { ActionIcon, AppShell, Burger, Group, Title, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

import classes from './Header.module.css';

type HeaderProps = {
  opened: boolean;

  onMenuClick: () => void;
};

const Header: FC<HeaderProps> = ({ opened, onMenuClick }) => {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <>
      <AppShell.Header
        p="md"
        mod={{ desktop: 'true' }}
        className={classes.header}
      >
        <Group align="center" justify="space-between">
          <Title>
            Casder movie
          </Title>

          <ActionIcon
            size="lg"
            color="white"
            variant="outline"
            onClick={() => setColorScheme('light')}
            lightHidden
          >
            <IconSun />
          </ActionIcon>

          <ActionIcon
            size="lg"
            color="black"
            variant="outline"
            onClick={() => setColorScheme('dark')}
            darkHidden
          >
            <IconMoon />
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Header
        p="md"
        mod={{ mobile: 'true' }}
        className={classes.header}
      >
        <Group align="center" justify="space-between">
          <Burger
            opened={opened}
            onClick={onMenuClick}
            aria-label="Toggle navigation"
          />

          <Title>
            Casder movie
          </Title>

          <ActionIcon
            size="lg"
            color="white"
            variant="outline"
            onClick={() => setColorScheme('light')}
            lightHidden
          >
            <IconSun />
          </ActionIcon>

          <ActionIcon
            size="lg"
            color="black"
            variant="outline"
            onClick={() => setColorScheme('dark')}
            darkHidden
          >
            <IconMoon />
          </ActionIcon>
        </Group>
      </AppShell.Header>
    </>
  );
};
export default Header;

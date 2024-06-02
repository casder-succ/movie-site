import { FC } from 'react';

import { Stack, Title } from '@mantine/core';

import NavigationButton from 'components/NavigationButton';

import { NavigationItem } from 'pages/_app/PageConfig/MainLayout/Navbar/types';
import { useRouter } from 'next/router';

type NavigationGroupProps = {
  title: string;
  items: NavigationItem[];
};

const NavigationGroup: FC<NavigationGroupProps> = ({ title, items }) => {
  const router = useRouter();

  return (
    <Stack>
      <Title order={5}>
        {title}
      </Title>

      {items.map((item) => {
        const isActive = router.pathname === item.href;

        return (
          <NavigationButton
            href={item.href}
            key={item.title}
            Icon={item.Icon}
            active={isActive}
          >
            {item.title}
          </NavigationButton>
        );
      })}
    </Stack>
  );
};

export default NavigationGroup;

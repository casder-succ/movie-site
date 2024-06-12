import { FC } from 'react';

import { Skeleton, Stack, Title } from '@mantine/core';

import NavigationButton from 'components/NavigationButton';

import { NavigationItem } from 'pages/_app/PageConfig/MainLayout/Navbar/types';
import { useRouter } from 'next/router';

type NavigationGroupProps = {
  title: string;
  items?: NavigationItem[];
  loading?: boolean
};

const NavigationGroup: FC<NavigationGroupProps> = ({
  title,
  items,
  loading = false,
}) => {
  const router = useRouter();

  console.log(items);

  if (!items?.length && !loading) {
    return null;
  }

  return (
    <Stack>
      <Title order={5}>
        {title}
      </Title>

      {loading && (
        Array(3).fill(<Skeleton height={32} />)
      )}

      {!loading && items && items.map((item) => {
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

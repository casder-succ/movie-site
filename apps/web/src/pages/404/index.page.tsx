import { NextPage } from 'next';
import Link from 'next/link';

import { Button, Center, Stack, Title } from '@mantine/core';

import { RoutePath } from 'routes';

const NotFound: NextPage = () => (
  <Center h="calc(100dvh - 160px)">
    <Stack align="center">
      <Title>
        Page not found
      </Title>

      <Button component={Link} href={RoutePath.Home}>
        Go home
      </Button>
    </Stack>
  </Center>
);

export default NotFound;

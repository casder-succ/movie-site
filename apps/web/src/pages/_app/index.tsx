import React, { FC } from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';

import { MantineProvider } from '@mantine/core';

import { theme } from 'theme';
import queryClient from 'query-client';

import PageConfig from './PageConfig';

import '@mantine/core/styles.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>
        Casder movie
      </title>

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
    </Head>

    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={theme}
        withGlobalClasses
        defaultColorScheme="dark"
      >
        <PageConfig>
          <Component {...pageProps} />
        </PageConfig>
      </MantineProvider>
    </QueryClientProvider>
  </>
);

export default App;

import React, { FC } from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';

import { theme } from 'theme';

import '@mantine/core/styles.css';
import PageConfig from './PageConfig';

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

    <MantineProvider
      theme={theme}
      withGlobalClasses
      defaultColorScheme="dark"
    >
      <PageConfig>
        <Component {...pageProps} />
      </PageConfig>
    </MantineProvider>
  </>
);

export default App;

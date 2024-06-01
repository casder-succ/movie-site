import React, { FC } from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';

import { theme } from 'theme';

import '@mantine/core/styles.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>
        Casder movie
      </title>
    </Head>

    <MantineProvider theme={theme} withGlobalClasses>
      <Component {...pageProps} />
    </MantineProvider>
  </>
);

export default App;

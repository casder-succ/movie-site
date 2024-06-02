import React from 'react';

import { Html, Main, Head, NextScript } from 'next/document';

import { ColorSchemeScript } from '@mantine/core';

const Document = () => (
  <Html>
    <Head>
      <ColorSchemeScript />

      <link
        type="image/png"
        sizes="96x96"
        rel="icon"
        href="/favicon.png"
      />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
      />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

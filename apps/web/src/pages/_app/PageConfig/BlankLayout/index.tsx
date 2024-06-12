import { FC, ReactNode } from 'react';

import Link from 'next/link';

import { Anchor } from '@mantine/core';

import classes from './BlankLayout.module.css';

type BlankLayoutProps = {
  children: ReactNode
};

const BlankLayout: FC<BlankLayoutProps> = ({ children }) => (
  <div className={classes.wrapper}>
    <div>
      <Anchor href="/" className={classes.link} component={Link}>
        Casder movie
      </Anchor>
    </div>

    {children}
  </div>
);

export default BlankLayout;

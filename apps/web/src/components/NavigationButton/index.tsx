import { FC, ForwardRefExoticComponent, ReactNode } from 'react';
import Link from 'next/link';

import { UnstyledButton } from '@mantine/core';

import classes from './NavigationButton.module.css';

type NavigationButtonProps = {
  href: string;
  children: ReactNode;

  active?: boolean;
  Icon?: ForwardRefExoticComponent<any>;
};

const NavigationButton: FC<NavigationButtonProps> = ({
  children,
  href,
  active,
  Icon,
}) => (
  <UnstyledButton
    component={Link}
    href={href}
    mod={{ active }}
    className={classes.navigationButton}
  >
    {Icon && (
      <div className={classes.icon}>
        <Icon width={20} />
      </div>
    )}

    <div>
      {children}
    </div>
  </UnstyledButton>
);

export default NavigationButton;

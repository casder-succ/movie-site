import { FC, ForwardRefExoticComponent, ReactNode } from 'react';
import Link from 'next/link';

import { Image, UnstyledButton } from '@mantine/core';

import classes from './NavigationButton.module.css';

type NavigationButtonProps = {
  href: string;
  children: ReactNode;

  active?: boolean;
  Icon?: ForwardRefExoticComponent<any> | string;
};

const NavigationButton: FC<NavigationButtonProps> = ({
  children,
  href,
  active,
  Icon,
}) => {
  const getIcon = () => {
    if (!Icon) {
      return null;
    }

    return (
      typeof Icon === 'string'
        ? (
          <div className={classes.icon}>
            <Image height={24} width={24} src={Icon} />
          </div>
        )
        : (
          <div className={classes.icon}>
            <Icon />
          </div>
        )
    );
  };

  return (
    <UnstyledButton
      component={Link}
      href={href}
      mod={{ active }}
      className={classes.navigationButton}
    >
      {getIcon()}

      <div>
        {children}
      </div>
    </UnstyledButton>
  );
};

export default NavigationButton;

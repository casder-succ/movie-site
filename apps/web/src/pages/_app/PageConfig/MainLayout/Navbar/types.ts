import { ForwardRefExoticComponent } from 'react';

export type NavigationItem = {
  title: string;
  href: string;
  Icon: ForwardRefExoticComponent<any>;
};

export type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

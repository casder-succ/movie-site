import { ForwardRefExoticComponent } from 'react';

export enum NavigationSource {
  GENRES = 'genres',
}

export type NavigationItem = {
  title: string;
  href: string;
  Icon: ForwardRefExoticComponent<any> | string;
};

export interface INavigationGroup {
  title: string;
  items?: NavigationItem[];
  source?: NavigationSource;
}

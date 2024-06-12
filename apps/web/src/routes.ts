export enum ScopeType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum LayoutType {
  MAIN = 'MAIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  BLANK = 'BLANK',
}

export enum RoutePath {
  Home = '/',
  Discovery = '/discovery',
  FreshMovies = '/fresh-movies',
  TrendingNow = '/trending-now',

  Genre = '/genre/[slug]',

  SignIn = '/sign-in',
  SignUp = '/sign-up',

  NotFound = '/404',
}

type RoutesConfiguration = {
  [routePath in RoutePath]: {
    scope?: ScopeType;
    layout?: LayoutType;
  };
};

export const routesConfiguration: RoutesConfiguration = {
  [RoutePath.Home]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Discovery]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.FreshMovies]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.TrendingNow]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Genre]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.SignIn]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.SignUp]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.NotFound]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.BLANK,
  },
};

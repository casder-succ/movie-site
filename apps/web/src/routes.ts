export enum RoutePath {
  Home = '/',
  Discovery = '/discovery',
  FreshMovies = '/fresh-movies',
  TrendingNow = '/trending-now',

  Genre = '/genre/[slug]',

  SignIn = '/sign-in',
  SignUp = '/sign-up',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password/[token]',
}

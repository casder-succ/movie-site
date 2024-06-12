import _merge from 'lodash/merge';
import * as process from 'process';

const env = process.env.NEXT_PUBLIC_APP_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./${env}.json`);

const base = {
  env,
  port: process.env.PORT || 3000,
  isDev: env === 'development' || env === 'development-docker',
  apiUrl: '',
  wsUrl: '',
  webUrl: '',
};

export default _merge(base, config);

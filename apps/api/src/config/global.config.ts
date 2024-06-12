import * as process from 'node:process';

export default {
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  webUrl: process.env.WEB_URL,
  apiUrl: process.env.API_URL,
};

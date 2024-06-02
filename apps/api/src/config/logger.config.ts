import winston, { transports, format } from 'winston';

import globalConfig from './global.config';

console.log(winston);

const prettyLoggerFormat = format.printf(info => {
  if (typeof info.message.constructor === 'object' || typeof info.message.constructor === 'function') {
    if (info.message.global) {
      info.message = info.message.global;
    } else {
      info.message = JSON.stringify(info.message, null, 4);
    }
  }

  return `${info.level}: ${info.message}`;
});

export default {
  transports: [
    new transports.Console(),
  ],
  format: globalConfig.isDev ? format.combine(
    format.colorize(),
    format.splat(),
    format.simple(),
    prettyLoggerFormat,
  ) : format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
  ),
};

import { NestFactory } from '@nestjs/core';

import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

import loggerConfig from './config/logger.config';
import globalConfig from './config/global.config';

async function bootstrap() {
  const loggerInstance = createLogger(loggerConfig);

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });

  app.enableCors({
    credentials: true,
    origin: (requestOrigin, callback) => {
      const validDomains = [globalConfig.apiUrl, globalConfig.webUrl];
      const originIndex = typeof requestOrigin === 'string'
        ? validDomains.indexOf(requestOrigin)
        : -1;

      if (originIndex !== -1) {
        return callback(null, requestOrigin ?? validDomains[0]);
      }

      return callback(null, validDomains[originIndex]);
    },
  });

  await app.listen(3005);
}
bootstrap();

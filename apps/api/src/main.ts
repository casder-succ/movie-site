import { NestFactory } from '@nestjs/core';

import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

import loggerConfig from './config/logger.config';

async function bootstrap() {
  const loggerInstance = createLogger(loggerConfig);

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });

  await app.listen(3005);
}
bootstrap();

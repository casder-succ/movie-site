import { NestFactory } from '@nestjs/core';

import { createLogger, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

import { AppModule } from './app.module';

async function bootstrap() {
  const loggerInstancee = createLogger({
    transports: [
      new transports.Console(),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstancee,
    }),
  });

  await app.listen(3005);
}
bootstrap();

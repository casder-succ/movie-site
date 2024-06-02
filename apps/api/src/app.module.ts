import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerInterceptor } from './logger/logger.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    Logger,
    AppService,
  ],
})
export class AppModule {}

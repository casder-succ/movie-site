import { join } from 'path';

import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { GenresModule } from 'genres/genres.module';

import { getDataBaseConfig } from './config/db.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerInterceptor } from './logger/logger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDataBaseConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UsersModule,
    GenresModule,
  ],
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

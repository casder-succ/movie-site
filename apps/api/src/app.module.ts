// eslint-disable-next-line import/named
import { path } from 'app-root-path';

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
import { FilesModule } from './files/files.module';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDataBaseConfig,
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/apps/api/public/uploads`,
      serveRoot: '/public/uploads',
    }),
    AuthModule,
    UsersModule,
    GenresModule,
    FilesModule,
    ActorsModule,
    MoviesModule,
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

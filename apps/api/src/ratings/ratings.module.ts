import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesModule } from 'movies/movies.module';

import { Rating, ratingsSchema } from './ratings.schema';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: ratingsSchema,
      },
    ]),
    MoviesModule,
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesService } from './movies.service';
import { Movie, moviesSchema } from './movies.schema';
import { MoviesController } from './movies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: moviesSchema,
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

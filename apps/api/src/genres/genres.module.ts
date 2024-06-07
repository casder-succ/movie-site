import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, genresSchema } from './genres.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Genre.name,
        schema: genresSchema,
      },
    ]),
  ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}

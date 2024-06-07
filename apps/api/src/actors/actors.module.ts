import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActorsService } from './actors.service';
import { Actor, actorsSchema } from './actors.schema';
import { ActorsController } from './actors.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Actor.name,
        schema: actorsSchema,
      },
    ]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}

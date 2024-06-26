import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateActorDto } from './dto/update-actor.dto';
import { CreateActorDto } from './dto/create-actor.dto';

import { Actor } from './actors.schema';

@Injectable()
export class ActorsService {
  constructor(@InjectModel(Actor.name) private readonly actorsModel: Model<Actor>) {}

  async getById(actorId: string) {
    const actor = await this.actorsModel.findById(actorId);

    if (!actor) {
      throw new NotFoundException('Actor not found.');
    }

    return actor;
  }

  async getBySlug(slug: string) {
    const actor = await this.actorsModel.findOne({ slug });

    if (!actor) {
      throw new NotFoundException('Actor not found.');
    }

    return actor;
  }

  async list(searchQuery?: string) {
    const options = {
      $or: [
        {
          name: {
            $regex: searchQuery || '',
            $options: 'i',
          },
        },
        {
          slug: {
            $regex: searchQuery || '',
            $options: 'i',
          },
        },
      ],
    };

    const actors = await this.actorsModel
      .aggregate()
      .match(options)
      .lookup({
        from: 'movies',
        localField: '_id',
        foreignField: 'actors',
        as: 'movies',
      })
      .addFields({
        moviesCount: { $size: '$movies' },
      })
      .sort({
        createdAt: -1,
      })
      .project({
        __v: 0,
        updatedAt: 0,
        movies: 0,
      })
      .exec();

    return { actors };
  }

  async update(actorId: string, updatedActor: UpdateActorDto) {
    const actor = await this.getById(actorId);

    actor.set(updatedActor).save();

    return actor;
  }

  async deleteAll() {
    await this.actorsModel.deleteMany().exec();

    return { message: 'All actors deleted.' };
  }

  async delete(actorId: string) {
    await this.actorsModel.findByIdAndDelete(actorId).exec();

    return { message: 'Actor deleted.' };
  }

  async create(createActorDto: CreateActorDto) {
    const actor = await this.actorsModel.create(createActorDto);

    return { actor };
  }
}

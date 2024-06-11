import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { MoviesService } from 'movies/movies.service';

import { Rating } from './ratings.schema';
import { UpsertRatingDto } from './dto/upsert-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private ratingsModel: Model<Rating>,
    private readonly moviesService: MoviesService,
  ) {}

  async getSpecificMovieValue(movieId: Types.ObjectId, userId: Types.ObjectId) {
    return this.ratingsModel
      .findOne({
        movieId,
        userId,
      })
      .exec()
      .then(({ value }) => value ?? 0);
  }

  async getAverageRating(movieId: Types.ObjectId | string) {
    const averageRating = await this.ratingsModel.aggregate([
      {
        $match: {
          movieId: new Types.ObjectId(movieId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: '$value',
          },
        },
      },
    ]).exec();

    return averageRating[0]?.averageRating ?? 0;
  }

  async setRating(userId: Types.ObjectId, upsertDto: UpsertRatingDto) {
    const { movieId, value } = upsertDto;

    const upsertedRating = await this.ratingsModel
      .findOneAndUpdate(
        { userId, movieId },
        { userId, movieId, value },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();

    const averageRating = await this.getAverageRating(movieId);

    await this.moviesService.updateAverageRating(movieId, averageRating);

    return upsertedRating;
  }

  async delete(userId: Types.ObjectId, movieId: Types.ObjectId) {
    return this.ratingsModel.findOneAndDelete({ userId, movieId }).exec();
  }
}

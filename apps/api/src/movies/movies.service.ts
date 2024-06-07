import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Movie } from './movies.schema';

import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private moviesModel: Model<Movie>) {}

  async findBySlug(slug: string) {
    const movie = await this.moviesModel
      .findOne({ slug })
      .populate('actors genres')
      .exec();

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async findByActor(actorId: string) {
    const movie = await this.moviesModel
      .findOne({ actors: actorId })
      .populate('actors genres')
      .exec();

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return { movie };
  }

  async getMostPopular() {
    const movies = await this.moviesModel
      .find({ views: { $gt: 0 } })
      .populate('genres')
      .sort({ views: -1 })
      .exec();

    return { movies };
  }

  async findByGenre(genreIds: string[]) {
    const movies = await this.moviesModel
      .find({ genres: { $in: genreIds } })
      .populate('actors genres')
      .exec();

    return { movies };
  }

  async findById(movieId: string) {
    const movie = await this.moviesModel
      .findById(movieId)
      .populate('actors genres')
      .exec();

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async list(searchQuery?: string) {
    const movies = await this.moviesModel
      .find({ title: { $regex: searchQuery || '', $options: 'i' } })
      .populate('actors genres');

    return { movies };
  }

  async create(createDto: CreateMovieDto) {
    return this.moviesModel.create(createDto);
  }

  async update(movieId: string, updateDto: UpdateMovieDto) {
    const movie = await this.findById(movieId);

    movie.set(updateDto);

    return movie.save();
  }

  async delete(movieId: string) {
    const movie = await this.findById(movieId);

    await movie.deleteOne();

    return movie;
  }

  async deleteAll() {
    await this.moviesModel.deleteMany().exec();

    return { message: 'All movies deleted' };
  }

  async incrementViews(movieId: string) {
    const movie = await this.moviesModel.findByIdAndUpdate({
      _id: movieId,
    }, {
      $inc: { views: 1 },
    }, {
      new: true,
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie.views;
  }
}

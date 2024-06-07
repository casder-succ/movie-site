import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Genre } from './genres.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private genresModel: Model<Genre>) {}

  async getBySlug(slug: string) {
    const genre = await this.genresModel.findOne({ slug });

    if (!genre) {
      throw new NotFoundException('Genre not found.');
    }

    return genre;
  }

  async getById(genreId: string) {
    const genre = await this.genresModel.findById(genreId);

    if (!genre) {
      throw new NotFoundException('Genre not found.');
    }

    return genre;
  }

  // todo: implement after implementing movies feature
  async getCollections() {
    const genres = await this.genresModel.find().exec();
    const collections = genres;

    return { collections };
  }

  /* Admin methods */

  async deleteAll() {
    await this.genresModel.deleteMany().exec();

    return { message: 'All genres deleted.' };
  }

  async create(createGenreDto: CreateGenreDto) {
    const genre = await this.genresModel.create(createGenreDto);

    return { genre };
  }

  async update(genreId: string, updatedGenre: UpdateGenreDto) {
    const genre = await this.getById(genreId);

    genre.set(updatedGenre).save();

    return { genre };
  }

  async delete(genreId: string) {
    const genre = await this.getById(genreId);

    await genre.deleteOne().exec();

    return { genre };
  }

  async list(searchQuery?: string) {
    const genres = await this.genresModel.find({
      $or: [
        {
          name: { $regex: new RegExp(searchQuery, 'i') },
        },
        {
          slug: { $regex: new RegExp(searchQuery, 'i') },
        },
        {
          description: { $regex: new RegExp(searchQuery, 'i') },
        },
      ],
    }).select('-__v').exec();

    return { genres };
  }
}

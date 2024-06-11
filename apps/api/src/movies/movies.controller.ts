import {
  Body,
  Controller, Delete,
  Get, HttpCode,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from 'auth/decorators/auth.decorator';

import { MongooseIdValidationPipe } from 'common/pipes/mongoose-id.validation.pipe';

import { MoviesService } from './movies.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Types } from 'mongoose';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(@Query('query') querySearch: string) {
    return this.moviesService.list(querySearch);
  }

  @Get('popular')
  async getPopularMovies() {
    return this.moviesService.getMostPopular();
  }

  @Get('genre')
  async getMoviesByGenre(@Query('genres', new ParseArrayPipe({ separator: ',', items: String })) genreIds: Types.ObjectId[]) {
    return this.moviesService.findByGenre(genreIds);
  }

  @Get('actor/:actorId')
  async getMoviesByActor(@Param('actorId', new MongooseIdValidationPipe()) actorId: string) {
    return this.moviesService.findByActor(actorId);
  }

  @Get(':id')
  async getMovie(@Param('id', new MongooseIdValidationPipe()) movieId: string) {
    return this.moviesService.findById(movieId);
  }

  @Get('slug/:slug')
  async getMovieBySlug(@Param('slug') slug: string) {
    return this.moviesService.findBySlug(slug);
  }

  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @Post()
  @Auth('admin')
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Post(':id/views')
  @HttpCode(200)
  async incrementViews(@Param('id', new MongooseIdValidationPipe()) movieId: string) {
    return this.moviesService.incrementViews(movieId);
  }

  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @Put(':id')
  @Auth('admin')
  async updateMovie(
  @Param('id', new MongooseIdValidationPipe()) movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieId, updateMovieDto);
  }

  @Delete(':id')
  @Auth('admin')
  async deleteMovie(@Param('id', new MongooseIdValidationPipe()) movieId: string) {
    return this.moviesService.delete(movieId);
  }

  @Delete()
  @Auth('admin')
  async deleteMovies() {
    return this.moviesService.deleteAll();
  }
}

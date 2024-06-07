import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { Auth } from 'auth/decorators/auth.decorator';

import { MongooseIdValidationPipe } from 'common/pipes/mongoose-id.validation.pipe';

import { CreateGenreDto } from './dto/create-genre.dto';

import { GenresService } from './genres.service';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async list(@Query('query') searchQuery?: string) {
    return this.genresService.list(searchQuery);
  }

  @Get('collections')
  async getCollections() {
    return this.genresService.getCollections();
  }

  @Get('slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return this.genresService.getBySlug(slug);
  }

  @Delete()
  @Auth('admin')
  async deleteAll() {
    return this.genresService.deleteAll();
  }

  @Delete(':genreId')
  @Auth('admin')
  async delete(@Param('genreId', new MongooseIdValidationPipe()) genreId: string) {
    return this.genresService.delete(genreId);
  }

  @Get(':genreId')
  @Auth('admin')
  async getById(@Param('genreId', new MongooseIdValidationPipe()) genreId: string) {
    return this.genresService.getById(genreId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':genreId')
  @Auth('admin')
  async update(
  @Param('genreId', new MongooseIdValidationPipe()) genreId: string,
    @Body() updatedGenre: UpdateGenreDto,
  ) {
    return this.genresService.update(genreId, updatedGenre);
  }
}

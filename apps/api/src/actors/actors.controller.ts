import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { Auth } from 'auth/decorators/auth.decorator';

import { MongooseIdValidationPipe } from 'common/pipes/mongoose-id.validation.pipe';

import { ActorsService } from './actors.service';

import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  async list(@Query('query') searchQuery?: string) {
    return this.actorsService.list(searchQuery);
  }

  @Get('slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return this.actorsService.getBySlug(slug);
  }

  @Delete()
  @Auth('admin')
  async deleteAll() {
    return this.actorsService.deleteAll();
  }

  @Delete(':actorId')
  @Auth('admin')
  async delete(@Param('actorId', new MongooseIdValidationPipe()) actorId: string) {
    return this.actorsService.delete(actorId);
  }

  @Get(':actorId')
  @Auth('admin')
  async getById(@Param('actorId', new MongooseIdValidationPipe()) actorId: string) {
    return this.actorsService.getById(actorId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @Put(':actorId')
  @Auth('admin')
  async update(
  @Param('actorId', new MongooseIdValidationPipe()) actorId: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorsService.update(actorId, updateActorDto);
  }
}

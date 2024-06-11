import { Types } from 'mongoose';

import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { Auth } from 'auth/decorators/auth.decorator';

import { User } from 'common/decorators/user.decorator';
import { MongooseIdValidationPipe } from 'common/pipes/mongoose-id.validation.pipe';

import { UpsertRatingDto } from './dto/upsert-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('movies/:movieId')
  @Auth()
  async getRatings(
  @Param('movieId', new MongooseIdValidationPipe()) movieId: Types.ObjectId,
    @User('_id') userId: Types.ObjectId,
  ) {
    return {
      rating: await this.ratingsService.getSpecificMovieValue(movieId, userId),
    };
  }

  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  @Post('')
  @Auth()
  async setRating(
  @User('_id') userId: Types.ObjectId,
    @Body() upsertDto: UpsertRatingDto,
  ) {
    return {
      rating: await this.ratingsService.setRating(userId, upsertDto),
    };
  }
}

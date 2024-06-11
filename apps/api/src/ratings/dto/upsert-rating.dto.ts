import { Types } from 'mongoose';

import { IsDefined, IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class UpsertRatingDto {
  @IsObjectId({
    message: 'Invalid movie id',
  })
  @IsDefined()
  movieId: Types.ObjectId;

  @IsNumber()
  @IsDefined()
  value: number;
}

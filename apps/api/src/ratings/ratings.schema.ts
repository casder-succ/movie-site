import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'users/users.schema';
import { Movie } from 'movies/movies.schema';

import { DocumentTimestamps } from 'common/types/schema.types';

export type RatingsDocument = HydratedDocument<Rating, DocumentTimestamps>;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: Movie.name })
  movieId: mongoose.Types.ObjectId;

  @Prop()
  value: number;
}

export const ratingsSchema = SchemaFactory.createForClass(Rating);

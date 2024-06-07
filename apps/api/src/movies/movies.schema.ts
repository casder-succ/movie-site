import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

import { DocumentTimestamps } from 'common/types/schema.types';
import { Actor } from '../actors/actors.schema';
import { Genre } from 'genres/genres.schema';

export type MovieDocument = HydratedDocument<Movie, DocumentTimestamps>;

export class MovieParameters {
  @Prop()
  year: number;

  @Prop()
  duration: number;

  @Prop()
  country: string;
}

@Schema({ timestamps: true })
export class Movie {
  @Prop()
  poster: string;

  @Prop()
  banner: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: null })
  parameters?: MovieParameters | null;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  views: number;

  @Prop()
  videoUrl: string;

  @Prop({ type: Types.ObjectId, ref: Genre.name })
  genres: Genre[];

  @Prop({ type: Types.ObjectId, ref: Actor.name })
  actors: Actor[];

  @Prop({ default: false })
  isSentToTelegram?: boolean;
}

export const moviesSchema = SchemaFactory.createForClass(Movie);

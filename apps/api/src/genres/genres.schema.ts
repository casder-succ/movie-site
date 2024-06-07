import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { DocumentTimestamps } from 'common/types/schema.types';

export type GenreDocument = HydratedDocument<Genre, DocumentTimestamps>;

@Schema({ timestamps: true })
export class Genre {
  @Prop()
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;
}

export const genresSchema = SchemaFactory.createForClass(Genre);

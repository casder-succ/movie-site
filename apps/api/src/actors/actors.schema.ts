import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { DocumentTimestamps } from 'common/types/schema.types';

export type GenreDocument = HydratedDocument<Actor, DocumentTimestamps>;

@Schema({ timestamps: true })
export class Actor {
  @Prop()
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  photo: string;
}

export const actorsSchema = SchemaFactory.createForClass(Actor);

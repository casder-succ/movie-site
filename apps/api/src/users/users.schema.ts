import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

import { DocumentTimestamps } from 'common/types/schema.types';
import { Movie } from '../movies/movies.schema';

export type UserDocument = HydratedDocument<User, DocumentTimestamps>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
    email: string;

  @Prop({ required: true })
    password: string;

  @Prop({ required: true })
    name: string;

  @Prop({ default: false, required: true })
    isAdmin: boolean;

  @Prop({ default: [], type: [Types.ObjectId], ref: Movie.name })
    favourites?: Types.ObjectId[];
}

export const usersSchema = SchemaFactory.createForClass(User);

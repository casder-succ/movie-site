import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { DocumentTimestamps } from 'common/types/schema.types';

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

  @Prop({ default: [], type: [String] })
    favourites?: any;
}

export const usersSchema = SchemaFactory.createForClass(User);

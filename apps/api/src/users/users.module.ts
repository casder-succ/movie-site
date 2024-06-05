import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, usersSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: usersSchema,
      },
    ]),
    ConfigModule.forRoot(),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

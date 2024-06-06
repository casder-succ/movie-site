import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { DocumentTimestamps } from 'common/types/schema.types';

import { User, UserDocument } from '../../users/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User & DocumentTimestamps>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ _id }: Pick<UserDocument, '_id'>) {
    return this.userModel.findById(_id).exec();
  }
}

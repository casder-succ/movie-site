import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from '../users/users.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecurityUtil } from 'common/utils/security.util';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: usersSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SecurityUtil,
    ConfigService,
    JwtStrategy,
  ],
})
export class AuthModule {}

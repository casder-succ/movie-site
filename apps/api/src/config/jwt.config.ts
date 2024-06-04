import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line import/no-extraneous-dependencies
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get<string>('JWT_SECRET'),
  };
};

import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDataBaseConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
  return {
    uri: configService.get<string>(
      'DATABASE_URI',
      'mongodb://localhost:27017/casder-movie',
    ),
  };
};

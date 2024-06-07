import { IsArray, IsBoolean, IsNumber, IsString, Validate } from 'class-validator';

export class MovieParameters {
  @IsNumber()
  year?: number;

  @IsNumber()
  duration?: number;

  @IsString()
  country?: string;
}

export class UpdateMovieDto {
  @IsString()
  poster?: string;

  @IsString()
  banner?: string;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  slug?: string;

  @Validate(MovieParameters)
  parameters?: MovieParameters;

  @IsString()
  videoUrl?: string;

  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsArray()
  @IsString({ each: true })
  actors?: string[];

  @IsBoolean()
  isSentToTelegram?: boolean;
}

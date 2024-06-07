import { IsArray, IsBoolean, IsDefined, IsNumber, IsString, Validate } from 'class-validator';

export class MovieParameters {
  @IsNumber()
  year: number;

  @IsNumber()
  duration: number;

  @IsString()
  country: string;
}

export class CreateMovieDto {
  @IsString()
  @IsDefined()
  poster: string;

  @IsString()
  @IsDefined()
  banner: string;

  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  slug: string;

  @Validate(MovieParameters)
  parameters?: MovieParameters;

  @IsString()
  @IsDefined()
  videoUrl: string;

  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  genres: string[];

  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  actors: string[];

  @IsBoolean()
  isSentToTelegram?: boolean;
}

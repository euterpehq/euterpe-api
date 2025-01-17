import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  API_BASE_URL: string;

  @IsString()
  @MinLength(32)
  @MaxLength(32)
  ENCRYPTION_SECRET: string;

  @IsString()
  ARTIST_APP_BASE_URL: string;

  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  REFRESH_TOKEN_SECRET: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_CA: string;

  @IsBoolean()
  DB_USE_SSL: boolean;

  @IsString()
  SPOTIFY_CLIENT_ID: string;

  @IsString()
  SPOTIFY_CLIENT_SECRET: string;

  @IsString()
  SPOTIFY_CALLBACK_URL: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

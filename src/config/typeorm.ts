import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'node:process';
import { parseBool } from '../common/utils/parse-bool.util';

dotenvConfig({ path: '.env' });

const useSsl = parseBool(process.env.DB_USE_SSL || '');

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [
    'dist/**/*.entity{.ts,.js}',
    'dist/**/entities/**/*.entity{.ts,.js}',
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  ...(useSsl && {
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.DB_CA || undefined, // Allow `undefined` if no CA is provided
    },
  }),
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

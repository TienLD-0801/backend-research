import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

dotenvConfig();

const dbConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA || 'public',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/**/migrations/*.js'],
  migrationsRun: true,
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
};

export default registerAs(process.env.DATABASE, () => dbConfig);

export const dataSource = new DataSource(dbConfig as DataSourceOptions);

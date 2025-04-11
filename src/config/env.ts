import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: process.env.PORT || '4000',
  DB_NAME: process.env.DB_NAME || 'rick-morty',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379
}

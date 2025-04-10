import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: process.env.PORT || '4000',
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10)
}

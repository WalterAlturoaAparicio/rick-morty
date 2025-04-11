import { Sequelize } from 'sequelize-typescript'
import { Character } from '../database/models/character.model'
import { env } from './env'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  models: [Character],
  logging: false
})

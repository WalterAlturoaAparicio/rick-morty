import { Sequelize } from 'sequelize-typescript'
import { Character } from '../database/models/character.model'
import { env } from './env.config'

let sequelize: Sequelize

//Solo se ejecuta una vez por instancia para evitar múltiples conexiones.
export async function connectDatabase() {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: env.DB_HOST,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      models: [Character],
      logging: false
    })
  }

  try {
    await sequelize.authenticate()
    console.log('🔌 DB connected')
  } catch (err) {
    console.error('❌ DB connection failed:', err)
    throw err
  }
}

export const getSequelize = () => {
  if (!sequelize) throw new Error('DB not connected yet')
  return sequelize
}

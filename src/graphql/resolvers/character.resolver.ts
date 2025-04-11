import { redisClient } from '../../config/redis'
import { Character } from '../../database/models/character.model'
import { Op } from 'sequelize'
import { MeasureExecutionTime } from '../../utils/mesure-time'
import { setCacheHit } from '../../middlewares/request-context'

class CharacterResolver {
  @MeasureExecutionTime
  async characters({ filter }: any, context: any) {
    const where: any = {}

    if (filter) {
      if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` }
      if (filter.status) where.status = { [Op.iLike]: filter.status }
      if (filter.species) where.species = { [Op.iLike]: filter.species }
      if (filter.gender) where.gender = { [Op.iLike]: filter.gender }
      if (filter.originName) where.originName = { [Op.iLike]: `%${filter.originName}%` }
    }

    const cacheKey = `characters:${JSON.stringify(filter || {})}`

    // Buscar en Redis
    const cached = await redisClient.get(cacheKey)
    if (cached) {
      setCacheHit(true)
      return JSON.parse(cached)
    }

    const characters = await Character.findAll({ where })

    setCacheHit(false)
    await redisClient.set(cacheKey, JSON.stringify(characters), {
      EX: 3600 // 1 hora
    })

    return characters
  }
}
export const characterResolver = new CharacterResolver()

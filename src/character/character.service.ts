import { CharacterRepository } from './character.repository'
import { redisClient, isRedisConnected } from '../config/redis.config'
import { setCacheHit } from '../common/middlewares/request-context.middleware'
import { CharacterFilter } from './character-filter.dto'
import { Character } from '../database/models/character.model'
import { MeasureExecutionTime } from '../common/decorators/mesure-time.decorator'

export class CharacterService {
  constructor(private readonly repo = new CharacterRepository()) {}

  @MeasureExecutionTime
  async getCharacters(filter: CharacterFilter): Promise<Character[]> {
    const cacheKey = `characters:${JSON.stringify(filter || {})}`

    //Manejo repsonse con redis
    if (isRedisConnected) {
      try {
        const cached = await redisClient.get(cacheKey)
        if (cached) {
          setCacheHit(true)
          return JSON.parse(cached)
        }
      } catch (err) {
        console.warn('⚠️ Redis get failed. Falling back to DB:', err.message)
      }
    }

    //Manejo response con DB
    const characters = await this.repo.findByFilter(filter)
    setCacheHit(false)

    if (isRedisConnected) {
      try {
        await redisClient.set(cacheKey, JSON.stringify(characters), { EX: 3600 })
      } catch (err) {
        console.warn('⚠️ Redis set failed. Continuing without cache:', err.message)
      }
    }

    return characters
  }
}

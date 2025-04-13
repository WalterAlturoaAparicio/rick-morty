
import { CharacterRepository } from './character.repository'
import { redisClient } from '../config/redis.config'
import { setCacheHit } from '../common/middlewares/request-context.middleware'

export class CharacterService {
  private repo = new CharacterRepository()

  async getCharacters(filter: any) {
    const cacheKey = `characters:${JSON.stringify(filter || {})}`
    const cached = await redisClient.get(cacheKey)

    if (cached) {
      setCacheHit(true)
      return JSON.parse(cached)
    }

    const characters = await this.repo.findByFilter(filter)

    setCacheHit(false)
    await redisClient.set(cacheKey, JSON.stringify(characters), { EX: 3600 })

    return characters
  }
}

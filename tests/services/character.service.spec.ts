import { CharacterService } from '../../src/character/character.service'
import { CharacterRepository } from '../../src/character/character.repository'
import { redisClient } from '../../src/config/redis.config'
import { Character } from '../../src/database/models/character.model'

jest.mock('../../src/character/character.repository')
jest.mock('../../src/config/redis.config.ts', () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn()
  },
  isRedisConnected: true
}))

describe('CharacterService', () => {
  const fakeCharacters: Partial<Character>[] = [
    {
      id: 1,
      name: 'Morty'
    }
  ]
  const repo = new CharacterRepository() as jest.Mocked<CharacterRepository>
  const service = new CharacterService(repo)

  afterEach(() => jest.clearAllMocks())

  it('should return cached characters if redis has data', async () => {
    ;(redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(fakeCharacters))

    const result = await service.getCharacters({})

    expect(result).toEqual(fakeCharacters)
    expect(repo.findByFilter).not.toHaveBeenCalled()
  })

  it('should fetch characters from DB if cache is empty and cache it', async () => {
    ;(redisClient.get as jest.Mock).mockResolvedValueOnce(null)
    repo.findByFilter.mockResolvedValueOnce(fakeCharacters as Character[])

    const result = await service.getCharacters({})

    expect(repo.findByFilter).toHaveBeenCalled()
    expect(redisClient.set).toHaveBeenCalled()
    expect(result).toEqual(fakeCharacters)
  })
})

import { characterResolver } from '../../src/character/graphql/character.resolver'
import { Character } from '../../src/database/models/character.model'
import { redisClient } from '../../src/config/redis.config'

jest.mock('../../src/database/models/character.model.ts')
jest.mock('../../src/config/redis.config.ts', () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn()
  }
}))

describe('CharacterResolver.characters', () => {
  const fakeCharacters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: 'Earth'
    }
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return characters from cache', async () => {
    ;(redisClient.get as jest.Mock).mockResolvedValueOnce(JSON.stringify(fakeCharacters))

    const result = await characterResolver.characters(null, { filter: {} })

    expect(redisClient.get).toHaveBeenCalled()
    expect(result).toEqual(fakeCharacters)
    expect(redisClient.set).not.toHaveBeenCalled()
  })

  it('should fetch from DB and set cache if not in Redis', async () => {
    ;(redisClient.get as jest.Mock).mockResolvedValueOnce(null)
    ;(Character.findAll as jest.Mock).mockResolvedValueOnce(fakeCharacters)

    const result = await characterResolver.characters(null, { filter: {} })

    expect(Character.findAll).toHaveBeenCalledWith({ where: {} })
    expect(redisClient.set).toHaveBeenCalled()
    expect(result).toEqual(fakeCharacters)
  })

  it('should construct proper where filter and query DB', async () => {
    const filter = { name: 'Rick', status: 'Alive' }

    ;(redisClient.get as jest.Mock).mockResolvedValueOnce(null)
    ;(Character.findAll as jest.Mock).mockResolvedValueOnce(fakeCharacters)

    await characterResolver.characters(null, { filter })

    expect(Character.findAll).toHaveBeenCalled()
    expect(redisClient.set).toHaveBeenCalled()
  })
})

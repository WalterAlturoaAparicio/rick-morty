import { CharacterResolver } from '../../src/character/graphql/character.resolver'
import { Character } from '../../src/database/models/character.model'

jest.mock('../../src/character/character.service')

const fakeCharacters = [{
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: 'Earth'
}]

describe('CharacterResolver', () => {
  const mockedService = { getCharacters: jest.fn() }
  const resolver =  new CharacterResolver(mockedService as any)

  afterEach(() => jest.clearAllMocks())

  it('should return characters from service', async () => {
    mockedService.getCharacters.mockResolvedValueOnce(fakeCharacters)

    const result = await resolver.characters(null, { filter: {} })

    expect(mockedService.getCharacters).toHaveBeenCalledWith({})
    expect(result).toEqual(fakeCharacters)
  })
})
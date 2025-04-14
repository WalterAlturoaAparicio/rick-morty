import { Character } from '../../src/database/models/character.model'
import { CharacterRepository } from '../../src/character/character.repository'

jest.mock('../../src/database/models/character.model')

describe('CharacterRepository', () => {
  const repo = new CharacterRepository()
  const fakeCharacters = [{ id: 1, name: 'Summer' }]

  afterEach(() => jest.clearAllMocks())

  it('should construct where filter and query DB', async () => {
    (Character.findAll as jest.Mock).mockResolvedValueOnce(fakeCharacters)
    const result = await repo.findByFilter({ name: 'Sum' })

    expect(Character.findAll).toHaveBeenCalledWith({
      where: expect.objectContaining({ name: expect.any(Object) })
    })
    expect(result).toEqual(fakeCharacters)
  })

  it('should find one by ID', async () => {
    (Character.findOne as jest.Mock).mockResolvedValueOnce(fakeCharacters[0])
    const result = await repo.findOneById(1)
    expect(result).toEqual(fakeCharacters[0])
  })

  it('should create a character', async () => {
    (Character.create as jest.Mock).mockResolvedValueOnce(fakeCharacters[0])
    const result = await repo.create({ name: 'Summer' })
    expect(result).toEqual(fakeCharacters[0])
  })

  it('should update a character', async () => {
    const mockUpdate = jest.fn().mockResolvedValueOnce({ ...fakeCharacters[0], status: 'Alive' })
    const fakeChar = { ...fakeCharacters[0], update: mockUpdate }
    const result = await repo.update(fakeChar as any, { status: 'Alive' })
    expect(result).toEqual({ ...fakeCharacters[0], status: 'Alive' })
  })
})
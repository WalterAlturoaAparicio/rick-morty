
import { CharacterService } from '../character.service'
import { CharacterFilter } from '../character-filter.dto'

export class CharacterResolver {
  constructor(private readonly service = new CharacterService()) {}

  //Se conserva `parent` para mantener la firma esperada del resolver.
  async characters(_parent: unknown, args: { filter: CharacterFilter }) {
    const { filter } = args
    const result = await this.service.getCharacters(filter)
    return result
  }
}

// Resolver es una interfaz con el cliente (GraphQL)
export const characterResolver = new CharacterResolver()

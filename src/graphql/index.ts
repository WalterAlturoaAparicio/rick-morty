import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'fs'
import { join } from 'path'
import { characterResolver } from '../character/graphql/character.resolver'

const typeDefs = readFileSync(join(__dirname, '../character/graphql/character.graphql'), 'utf-8')

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
        // Es necesario el `bind` para preservar el contexto (`this`) de la instancia `characterResolver`.
        characters: characterResolver.characters.bind(characterResolver)
    }
  }
})

// src/cron/character.cron.ts
import cron from 'node-cron'
import axios from 'axios'
import { Character } from '../../database/models/character.model'

interface APICharacter {
  id: number
  name: string
  status: string
  species: string
  gender: string
  origin: {
    name: string
  }
}

async function fetchAllCharactersFromAPI(): Promise<APICharacter[]> {
  const characters: APICharacter[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
    characters.push(...data.results)
    hasNextPage = data.info.next !== null
    page++
  }

  return characters
}

async function syncCharacters() {
  try {
    console.log('Sincronizando personajes...')

    const apiCharacters = await fetchAllCharactersFromAPI()

    for (const char of apiCharacters) {
      const existing = await Character.findOne({ where: { id: char.id } })

      const characterData = {
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name
      }

      if (!existing) {
        await Character.create(characterData)
        console.log(`Creando personaje: ${char.name}`)
      } else {
        const hasChanges =
          existing.name !== char.name ||
          existing.status !== char.status ||
          existing.species !== char.species ||
          existing.gender !== char.gender ||
          existing.origin !== char.origin.name

        if (hasChanges) {
          await existing.update(characterData)
          console.log(`Actualizando personaje: ${char.name}`)
        }
      }
    }

    console.log('Sincronizacion completada')
  } catch (error) {
    console.error('Error sincronizando personajes', error)
  }
}

export function startCharacterCron() {
  // cada 12 horas
  cron.schedule('0 */12 * * *', syncCharacters)
}

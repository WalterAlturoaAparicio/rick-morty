import cron from 'node-cron'
import axios from 'axios'
import { CharacterRepository } from '../../character/character.repository'

// Representacion del character en la API de rick & morty https://rickandmortyapi.com
interface APICharacter {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
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

/**
 *  Sincroniza los personajes obtenidos desde la API externa (https://rickandmortyapi.com) con la base de datos local.
 */
async function syncCharacters() {
  const character = new CharacterRepository()
  try {
    console.log('Sincronizando personajes...')

    const apiCharacters = await fetchAllCharactersFromAPI()

    for (const char of apiCharacters) {
      const existing = await character.findOneById(char.id)

      const characterApi = {
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name,
        image: char.image
      }

      if (!existing) {
        await character.create(characterApi)
        console.log(`Creando personaje: ${char.name}`)
      } else {
        const hasChanges =
          existing.name !== char.name ||
          existing.status !== char.status ||
          existing.species !== char.species ||
          existing.gender !== char.gender ||
          existing.origin !== char.origin.name || 
          existing.image !== char.image

        if (hasChanges) {
          await character.update(existing, characterApi)
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
  // a las 00:00 y 12:00 todos los días
  cron.schedule('0 */12 * * *', syncCharacters)
}

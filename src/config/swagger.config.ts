import swaggerJSDoc from 'swagger-jsdoc'
import { Character } from '../database/models/character.model'

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rick and Morty API',
      version: '1.0.0',
      description: 'API para consultar personajes de RICK & MORTY con filtros avanzados'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      schemas: {
        Character: {
          type: 'object',
          properties: {
            ...Character
          }
        }
      }
    }
  },
  apis: ['src/**/*.route.ts'],
})

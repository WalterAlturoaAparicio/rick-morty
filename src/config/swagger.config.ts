import swaggerJSDoc from 'swagger-jsdoc'

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
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Rick Sanchez' },
            status: { type: 'string', example: 'Alive' },
            species: { type: 'string', example: 'Human' },
            gender: { type: 'string', example: 'Male' },
            origin: { type: 'string', example: 'Earth' },
            image: { type: 'string', example: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          },
          required: ['name', 'status', 'species', 'gender', 'origin', 'image']
        }
      }
    }
  },
  apis: ['src/**/*.route.ts'],
})

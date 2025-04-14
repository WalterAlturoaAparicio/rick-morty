import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from './graphql/index'
import { loggerMiddleware } from './common/middlewares/logger.middleware'
import { contextMiddleware } from './common/middlewares/request-context.middleware'
import { renderGraphiQL } from 'graphql-yoga'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config'
import characterRouter from './character/character.route'

export function createApp() {
  const app = express()

  app.use(contextMiddleware)

  //Registrar todas las peticiones, incluso si fallan.
  app.use(loggerMiddleware)

  /**
   * Añade el objeto `context` al request.
   * Es necesario porque `graphql-http` no lo hace automáticamente como otras librerías (ej: Apollo).
   * Así el contexto compartido se mantiene accesible durante el ciclo de vida completo.
   * (ej: pasar info de un resolver de graphql a un logger)
   */
  app.use((req, res, next) => {
    (req as any).context = { req, res }
    next()
  })

  // Documentación REST **se crea el endpoint characters como ejemplo**
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use('/api/characters', characterRouter)

  app.all(
    '/graphql',
    createHandler({
      schema,
       // Se extrae el contexto manual inyectado previamente para que esté disponible en los resolvers.
      context: (request) => {
        const { context } = request as any
        return context
      }
    })
  )

  // UI interactiva
  app.get('/graphiql', (_req, res) => {
    res.send(renderGraphiQL({ endpoint: '/graphql' }))
  })

  return app
}

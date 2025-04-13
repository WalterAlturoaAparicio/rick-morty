import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from './graphql/index'
import { characterResolver } from './character/graphql/character.resolver'
import { loggerMiddleware } from './common/middlewares/logger.middleware'
import { contextMiddleware } from './common/middlewares/request-context.middleware'
import { renderGraphiQL } from 'graphql-yoga'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config'
import characterRouter from './character/character.route'

export function createApp() {
  const app = express()

  app.use(contextMiddleware)
  app.use(loggerMiddleware)
  app.use((req, res, next) => {
    ;(req as any).context = { req, res }
    next() 
  })
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use('/api/characters', characterRouter)

  app.all(
    '/graphql',
    createHandler({
      schema,
      context: (request) => {
        const { context } = request as any
        return context
      }
    })
  )

  app.get('/graphiql', (_req, res) => {
    res.send(renderGraphiQL({ endpoint: '/graphql' }))
  })

  return app
}

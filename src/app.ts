import 'reflect-metadata'
import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from './graphql/schema'
import { characterResolver } from './graphql/resolvers/character.resolver'
import { sequelize } from './config/database'
import { env } from './config/env'
import { renderGraphiQL } from 'graphql-yoga'
import { loggerMiddleware } from './middlewares/logger.middleware'
import { connectRedis } from './config/redis'
import { contextMiddleware } from './middlewares/request-context'

const app = express()
app.use(contextMiddleware)
app.use(loggerMiddleware)
app.use((req, res, next) => {
  (req as any).context = { req, res }
  next()
})
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: characterResolver,
    context: (request) => {
      const { context } = request as any;
      return context;
    }
  })
)
app.get('/graphiql', (_req, res) => {
  res.send(renderGraphiQL({ endpoint: '/graphql' }))
})

sequelize
  .authenticate()
  .then(() => {
    console.log('🔌 DB connected')
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${env.PORT}/graphql`)
    })
  })
  .catch((err) => console.error('❌ DB connection failed:', err))

connectRedis().then(() => console.log('📦 Redis connected'))
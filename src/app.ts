import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from './graphql/schema'
import { characterResolver } from './graphql/resolvers/character.resolver'
import { sequelize } from './config/database'
import { env } from './config/env'
import { renderGraphiQL } from 'graphql-yoga'

const app = express()

app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: characterResolver
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

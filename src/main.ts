import { createApp } from './app'
import { connectDatabase } from './config/database.config'
import { connectRedis } from './config/redis.config'
import { env } from './config/env.config'
import { startCharacterCron } from './common/jobs/character.job'

async function startServer() {
  try {
    await connectDatabase()
    await connectRedis()
    startCharacterCron()

    const app = createApp()
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${env.PORT}/graphql`)
    })
  } catch (err) {
    console.error('❌ App failed to start:', err)
  }
}

startServer()

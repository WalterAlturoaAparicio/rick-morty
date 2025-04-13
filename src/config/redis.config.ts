import { createClient } from 'redis'
import { env } from './env.config'

export const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
})

redisClient.on('error', (err) => console.error('❌ Redis Error:', err))

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect()
    console.log('📦 Redis connected')
  }
}

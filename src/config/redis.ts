import { createClient } from 'redis'
import { env } from '../config/env'

export const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
})

redisClient.on('error', (err) => console.error('❌ Redis Error:', err))

export const connectRedis = async () => {
  if (!redisClient.isOpen) await redisClient.connect()
}

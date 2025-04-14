import { createClient } from 'redis'
import { env } from './env.config'

export let isRedisConnected = false

export const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
  socket: {
    reconnectStrategy: false 
  }
})

redisClient.on('error', (err) => {
  if (!isRedisConnected) {
    console.warn('⚠️ Redis connection error (during startup):', err.message)
  } else {
    console.warn('⚠️ Redis error:', err.message)
  }
})

export const connectRedis = async () => {
  try {
    //Validacion de 3 segundos para conectar o iniciar el servidor sin cache.
    const connectTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Redis connection timeout')), 3000)
    )

    await Promise.race([
      redisClient.connect(),
      connectTimeout
    ])

    isRedisConnected = true
    console.log('📦 Redis connected')
  } catch (err) {
    console.warn('⚠️ Redis not connected. Continuing without cache.')
    isRedisConnected = false
  }
}
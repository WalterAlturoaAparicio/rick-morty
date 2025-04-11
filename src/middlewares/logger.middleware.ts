import { Request, Response, NextFunction } from 'express'
import { getCacheHit } from './request-context'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req
  const timestamp = new Date().toISOString()

  res.on('finish', () => {
    const status = res.statusCode
    const cacheStatus =
      getCacheHit() === true ? 'CACHE HIT' : getCacheHit() === false ? 'DB QUERY' : 'N/A'

    console.log(`[${timestamp}] ${method} ${originalUrl} → ${status} [${cacheStatus}]`)
  })

  next()
}

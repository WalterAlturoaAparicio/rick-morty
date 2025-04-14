import { Request, Response, NextFunction } from 'express'
import { getCacheHit } from './request-context.middleware'

/**
 * Permite capturar el código de estado final y si se usó cache o no
 * Se evita registrar durante la ejecución para no capturar estados intermedios ni respuestas fallidas parciales.
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req
  const timestamp = new Date().toISOString()

  res.on('finish', () => {
    const status = res.statusCode

    //contexto compartido entre middlewares y resolvers para determinar si se leyó de caché.
    const cacheHit = getCacheHit()

    let cacheStatus = 'N/A'
    if (cacheHit === true) cacheStatus = 'CACHE HIT'
    else if (cacheHit === false) cacheStatus = 'DB QUERY'

    console.log(`[${timestamp}] ${method} ${originalUrl} → ${status} [${cacheStatus}]`)
  })

  next()
}

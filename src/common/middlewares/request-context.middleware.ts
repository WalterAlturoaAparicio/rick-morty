import { AsyncLocalStorage } from 'async_hooks'
import { Request, Response } from 'express'

/**
 * Mantiene el contexto durante el ciclo de vida de una petición.
 * Se usa para `variables globales por request`
 */
const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>()

export const contextMiddleware = (_req: Request, _res: Response, next: () => any) => {
  asyncLocalStorage.run(new Map(), () => next())
}

export const setCacheHit = (value: boolean) => {
  const store = asyncLocalStorage.getStore()
  if (store) store.set('cacheHit', value)
}

export const getCacheHit = (): boolean | undefined => {
  const store = asyncLocalStorage.getStore()
  return store?.get('cacheHit')
}

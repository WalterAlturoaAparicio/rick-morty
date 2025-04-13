export function MeasureExecutionTime(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any[]) {
    const start = process.hrtime()
    const result = await originalMethod.apply(this, args)
    const [sec, nano] = process.hrtime(start)
    const timeMs = (sec * 1e9 + nano) / 1e6
    console.log(`[/${propertyKey}] took ${timeMs.toFixed(2)} ms`)
    return result
  }

  return descriptor
}

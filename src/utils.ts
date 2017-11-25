export function basicAssign(target: any, source: any) {
  let prop

  for (prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      target[prop] = source[prop]
    }
  }

  return target
}

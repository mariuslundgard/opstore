export function pathJoin(...segments: Array<string | null>) {
  const validSegments = segments.filter(k => !!k)

  if (validSegments.length === 0) {
    return null
  }

  return validSegments.join('/')
}

export function parseDepth(line: string): number {
  const substring = line.split("info depth ")[1]
  const depth = substring.split(" ")[0]
  return Number(depth)
}
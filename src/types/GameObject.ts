export interface config {
  x: number
  y: number
  direction: string
  src?: string
}

export type addWall = (
  x: number,
  y: number
) => void

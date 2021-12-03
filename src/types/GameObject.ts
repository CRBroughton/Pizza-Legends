export interface Config {
  x: number
  y: number
  direction: string
  src?: string
}

export type AddWall = (
  x: number,
  y: number
) => void

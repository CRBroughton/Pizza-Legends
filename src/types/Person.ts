export interface Config {
  isPlayerControlled?: boolean
  x?: number
  y?: number
  direction?: string
  src?: string | undefined
}

export interface DirectionUpdate {
  up: [string, number]
  down: [string, number]
  left: [string, number]
  right: [string, number]
}
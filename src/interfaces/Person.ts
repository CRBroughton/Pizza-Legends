export interface config {
  isPlayerControlled?: boolean
  x?: number
  y?: number
  direction?: string
  src?: string | undefined
}

export interface directionUpdate {
  up: [string, number]
  down: [string, number]
  left: [string, number]
  right: [string, number]
}

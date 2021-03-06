interface behaviourLoop {
  type: string
  direction: string
  time: number
}

export interface Config {
  isPlayerControlled?: boolean
  x?: number
  y?: number
  direction?: string
  src?: string | undefined
  behaviourLoop?: behaviourLoop
}

export interface DirectionUpdate {
  up: (string | number)[]
  down: (string | number)[]
  left: (string | number)[]
  right: (string | number)[]
}

export type startBehaviour = (
  state: { key?: string; map?: any },
  behaviour: { type: any; direction: any }
) => void

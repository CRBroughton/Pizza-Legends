import GameObject from '@/GameObject.js'

export interface Config {
  gameObjects: GameObject
  walls: {}
  lowerSrc: string
  upperSrc: string
}

export interface CameraPerson {
  x: number
  y: number
}

export type IsSpaceTaken = (
  currentX: number,
  currentY: number,
  direction: string,
) => boolean

export type Wall = (
  wasX: number,
  wasY: number,
  direction?: string,
) => void

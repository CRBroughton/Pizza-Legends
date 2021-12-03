import GameObject from '@/GameObject.js'

export interface config {
  gameObjects: GameObject
  walls: {}
  lowerSrc: string
  upperSrc: string
}

export interface cameraPerson {
  x: number
  y: number
}

export type isSpaceTaken = (
  currentX: number,
  currentY: number,
  direction: string,
) => boolean

export type wall = (
  wasX: number,
  wasY: number,
  direction?: string,
) => void

export type takenSpace = (
  x: number,
  y: number,
  direction: string | undefined,
) => { x: number; y: number }

import GameObject from './GameObject.js'

export default class Person extends GameObject {
  movingProgressRemaining: number
  constructor(config: { x: number; y: number; src?: string | undefined }) {
    super(config)
    this.movingProgressRemaining = 0
  }
}

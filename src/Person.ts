import GameObject from './GameObject.js'

export default class Person extends GameObject {
  movingProgressRemaining: number

  constructor(config) {
    super(config)
    this.movingProgressRemaining = 0

    this.directionUpdate = {
      up: ['y', 1],
      down: ['y', 1],
      left: ['y', 1],
      right: ['y', 1],
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction]
      this[property] += change
      this.movingProgressRemaining -= 1
    }
  }
}

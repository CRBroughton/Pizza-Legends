import GameObject from '@/GameObject.js'
export default class Person extends GameObject {
  movingProgressRemaining: number
  isPlayerControlled: boolean
  directionUpdate: { up: (string | number)[]; down: (string | number)[]; left: (string | number)[]; right: (string | number)[] }

  constructor(config: any) {
    super(config)
    this.movingProgressRemaining = 0

    this.isPlayerControlled = config.isPlayerControlled || false

    this.directionUpdate = {
      up: ['y', -1],
      down: ['y', 1],
      left: ['x', -1],
      right: ['x', 1],
    }
  }

  update(state: { key: string }) {
    this.updatePosition()
    this.updateSprite(state)

    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.key) {
      // Moves direction
      this.direction = state.key
      this.movingProgressRemaining = 16
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change]: [string, number] = this.directionUpdate[this.direction]
      this[property] += change
      this.movingProgressRemaining -= 1
    }
  }

  updateSprite(state) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.key) {
      this.sprite.setAnimation(`idle-${this.direction}`)
      return
    }
    if (this.movingProgressRemaining > 0)
      this.sprite.setAnimation(`walk-${this.direction}`)
  }
}

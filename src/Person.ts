import GameObject from '@/GameObject.js'
import { DirectionUpdate } from '@/types/Person'
export default class Person extends GameObject {
  movingProgressRemaining: number
  isPlayerControlled: boolean
  directionUpdate: DirectionUpdate

  constructor(config) {
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
    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    }
    else {
      // More cases for starting to walk will come here

      // Case: We're keyboard ready and have a arrow pressed
      if (this.isPlayerControlled && state.key) {
        this.startBehaviour(state, {
          type: 'walk',
          direction: state.key,
        })
      }
      this.updateSprite(state)
    }
  }

  // Moves direction
  startBehaviour(state, behaviour) {
    // setting character direction to behaviour state
    this.direction = behaviour.direction
    if (behaviour.type === 'walk') {
      // stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction))
        return
      // ready to walk
      state.map.moveWall(this.x, this.y, this.direction)
      this.movingProgressRemaining = 16
    }
  }

  updatePosition() {
    const [property, change]: [string, number] = this.directionUpdate[this.direction]
    this[property] += change
    this.movingProgressRemaining -= 1
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`)
      return
    }
    this.sprite.setAnimation(`idle-${this.direction}`)
  }
}

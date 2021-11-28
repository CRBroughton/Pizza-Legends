export default class DirectionInput {
  heldDirections: string[]
  constructor() {
    this.heldDirections = []

    this.map = {
      KeyW: 'up',
      KeyA: 'left',
      KeyS: 'down',
      KeyD: 'right',
    }
  }

  get direction() {
    return this.heldDirections[0]
  }

  init() {
    document.addEventListener('keydown', (e) => {
      const dir = this.map[e.code]
      if (dir && !this.heldDirections.includes(dir))
        this.heldDirections.unshift(dir)
    })
    document.addEventListener('keyup', (e) => {
      const dir = this.map[e.code]
      const index = this.heldDirections.indexOf(dir)

      if (index > -1)
        this.heldDirections.splice(index, 1)
    })
  }
}

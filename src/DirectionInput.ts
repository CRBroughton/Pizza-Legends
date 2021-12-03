import { Map } from '@/types/DirectionInput'
export default class DirectionInput {
  heldDirections: string[]
  map: Map
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
      const dir = this.map[e.code as keyof Map]
      if (dir && !this.heldDirections.includes(dir))
        this.heldDirections.unshift(dir)
    })
    document.addEventListener('keyup', (e) => {
      const dir = this.map[e.code as keyof Map]
      const index = this.heldDirections.indexOf(dir)

      if (index > -1)
        this.heldDirections.splice(index, 1)
    })
  }
}

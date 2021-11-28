export default class DirectionInput {
  constructor() {
    this.heldDirections = []

    this.map = {
      KeyW: 'up',
      KeyA: 'left',
      KeyS: 'down',
      KeyD: 'right',
    }
  }

  init() {
    document.addEventListener('keydown', (e) => {
      console.log(e.code)
    })
  }
}

import DirectionInput from '@/DirectionInput.js'
import OverworldMap from '@/OverworldMap.js'

export default class Overworld {
  element: HTMLDivElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  map: OverworldMap
  constructor(config: { element: HTMLDivElement }) {
    this.element = config.element
    this.canvas = this.element.querySelector('.game-canvas')!
    this.ctx = this.canvas.getContext('2d')!
    this.map = null
  }

  startGameLoop() {
    const step = () => {
      // Clears the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // Draws map lower image
      this.map.drawLowerImage(this.ctx)

      // Draws game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          key: this.directionInput.direction,
        })
        object.sprite.draw(this.ctx)
      })

      // Draws map upper image
      this.map.drawUpperImage(this.ctx)
      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
    this.directionInput = new DirectionInput()
    this.directionInput.init()
    this.startGameLoop()
  }
}

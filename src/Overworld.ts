import DirectionInput from '@/DirectionInput.js'
import OverworldMap from '@/OverworldMap.js'
import { CameraPerson } from '@/types/OverworldMap'

export default class Overworld {
  element: HTMLDivElement
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  map: OverworldMap
  directionInput: DirectionInput | undefined
  constructor(config: { element: HTMLDivElement }) {
    this.element = config.element
    this.canvas = this.element.querySelector('.game-canvas')!
    this.ctx = this.canvas.getContext('2d')!
    this.map = null!
  }

  startGameLoop() {
    const step = () => {
      // Clears the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // establish the camera person
      const cameraPerson: CameraPerson = this.map.gameObjects.hero

      // update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          key: this.directionInput?.direction,
          map: this.map,
        })
      })

      // Draws map lower image
      this.map.drawLowerImage(this.ctx, cameraPerson)

      // Draws game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson)
      })
      // Draws map upper image
      this.map.drawUpperImage(this.ctx, cameraPerson)
      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
    this.map.mountObjects()
    this.directionInput = new DirectionInput()
    this.directionInput.init()
    this.startGameLoop()
  }
}

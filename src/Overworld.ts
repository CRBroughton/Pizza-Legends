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

  draw() {
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
    Object.values(this.map.gameObjects).sort((a, b) => {
      // Reorders the image in the correct z-index (no overlapping)
      return a.y - b.y
    }).forEach((object) => {
      object.sprite.draw(this.ctx, cameraPerson)
    })
    // Draws map upper image
    this.map.drawUpperImage(this.ctx, cameraPerson)
  }

  startGameLoop() {
    const fps = 60
    const fpsInterval = 1000 / fps
    let then = window.performance.now()

    const step = () => {
      requestAnimationFrame(step)

      // calc elapsed time since last loop
      const now = window.performance.now()
      const elapsed = now - then

      // if enough time has elapsed, draw the next frame
      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval)

        // draw stuff here
        this.draw()
      }
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
    this.map.mountObjects()
    this.directionInput = new DirectionInput()
    this.directionInput.init()
    this.startGameLoop()

    this.map.startCutscene([
      { type: 'textMessage', text: 'WHY HELLO THERE' },
    ])

    // this.map.startCutscene([
    //   { who: 'hero', type: 'walk', direction: 'down' },
    //   { who: 'hero', type: 'walk', direction: 'down' },
    //   { who: 'npc1', type: 'walk', direction: 'left' },
    //   { who: 'npc1', type: 'walk', direction: 'left' },
    //   { who: 'npc1', type: 'stand', direction: 'up', time: 800 },
    // ])
  }
}

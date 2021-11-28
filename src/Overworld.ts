import OverworldMap from './OverworldMap.js'

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
      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
    this.startGameLoop()
  }
}

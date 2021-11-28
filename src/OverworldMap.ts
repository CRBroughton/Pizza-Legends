import { utils } from './utils.js'
import GameObject from './GameObject.js'
import Person from './Person.js'

export default class OverworldMap {
  gameObjects: GameObject
  lowerImage: HTMLImageElement
  upperImage: HTMLImageElement
  constructor(config: { gameObjects: GameObject; lowerSrc: string; upperSrc: string }) {
    this.gameObjects = config.gameObjects

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc
  }

  drawLowerImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImage, 0, 0)
  }

  drawUpperImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.upperImage, 0, 0)
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: 'images/maps/DemoLower.png',
    upperSrc: 'images/maps/DemoUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
      }),
    },
  },
}

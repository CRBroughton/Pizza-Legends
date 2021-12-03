import { utils, nextPosition } from '@/utils.js'
import GameObject from '@/GameObject.js'
import Person from '@/Person.js'
import { config, cameraPerson, isSpaceTaken, wall } from '@/interfaces/OverworldMap'

export default class OverworldMap {
  gameObjects: GameObject
  lowerImage: HTMLImageElement
  upperImage: HTMLImageElement
  walls: {[key: string]: boolean}

  constructor(config: config) {
    this.gameObjects = config.gameObjects
    this.walls = config.walls || {}

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: cameraPerson) {
    ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: cameraPerson) {
    ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  isSpaceTaken: isSpaceTaken = (currentX, currentY, direction) => {
    const { x, y } = nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((object) => {
      // TODO: determine if this object should actually mount
      object.mount(this)
    })
  }

  addWall: wall = (x, y) => {
    this.walls[`${x},${y}`] = true
  }

  removeWall: wall = (x, y) => {
    delete this.walls[`${x},${y}`]
  }

  moveWall: wall = (wasX, wasY, direction) => {
    this.removeWall(wasX, wasY)
    const { x, y } = nextPosition(wasX, wasY, direction)
    this.addWall(x, y)
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
        src: 'images/characters/people/npc2.png',
      }),
    },
    walls: {
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
}

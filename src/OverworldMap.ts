import OverworldEvent from '@/OverworldEvent.js'
import { utils, nextPosition } from '@/utils.js'
import GameObject from '@/GameObject.js'
import Person from '@/Person.js'
import { Config, CameraPerson, IsSpaceTaken, Wall } from '@/types/OverworldMap'

export default class OverworldMap {
  gameObjects: GameObject
  lowerImage: HTMLImageElement
  upperImage: HTMLImageElement
  walls: {[key: string]: boolean}
  isCutscenePlaying: boolean
  cutsceneSpaces: any

  constructor(config: Config) {
    this.overworld = null
    this.gameObjects = config.gameObjects
    this.cutsceneSpaces = config.cutsceneSpaces || {}
    this.walls = config.walls || {}

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc

    this.isCutscenePlaying = false
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: CameraPerson) {
    ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: CameraPerson) {
    ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y)
  }

  isSpaceTaken: IsSpaceTaken = (currentX, currentY, direction) => {
    const { x, y } = nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      const object = this.gameObjects[key]
      object.id = key
      // TODO: determine if this object should actually mount
      object.mount(this)
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true

    // start a loop of async events
    for (let index = 0; index < events.length; index++) {
      const eventHandler = new OverworldEvent({
        event: events[index],
        map: this,
      })
      await eventHandler.init()
    }

    this.isCutscenePlaying = false

    // Reset NPCS to do idle behaviour
    Object.values(this.gameObjects).forEach(object => object.doBehaviourEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects.hero
    const nextCoords = nextPosition(hero.x, hero.y, hero.direction)
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    })
    if (!this.isCutscenePlaying && match && match.talking.length)
      this.startCutscene(match.talking[0].events)
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects.hero
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]
    if (!this.isCutscenePlaying && match)
      this.startCutscene(match[0].events)
  }

  addWall: Wall = (x, y) => {
    this.walls[`${x},${y}`] = true
  }

  removeWall: Wall = (x, y) => {
    delete this.walls[`${x},${y}`]
  }

  moveWall: Wall = (wasX, wasY, direction) => {
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
        src: 'images/characters/people/npc1.png',
        behaviourLoop: [
          { type: 'stand', direction: 'left', time: 1000 },
          { type: 'stand', direction: 'up', time: 800 },
          { type: 'stand', direction: 'right', time: 1200 },
          { type: 'stand', direction: 'up', time: 300 },
        ],
        talking: [
          {
            events: [
              { type: 'textMessage', text: 'I\'m busy', faceHero: 'npc1' },
              { type: 'textMessage', text: 'Go away!' },
            ],
          },
        ],
      }),
      npc2: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(5),
        src: 'images/characters/people/npc2.png',
        behaviourLoop: [
          { type: 'stand', direction: 'left', time: 1000 },
          { type: 'stand', direction: 'down', time: 1200 },
          { type: 'stand', direction: 'right', time: 500 },
          { type: 'stand', direction: 'down', time: 800 },
        ],
      }),
    },
    walls: {
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
    cutsceneSpaces: {
      [
      utils.asGridCoord(7, 4)]: [
        {
          events: [
            { who: 'npc2', type: 'walk', direction: 'left' },
            { who: 'npc2', type: 'stand', direction: 'up', time: 500 },

            { type: 'textMessage', text: 'You can\'t be in there!' },

            { who: 'npc2', type: 'walk', direction: 'right' },
            { who: 'npc2', type: 'stand', direction: 'down' },

            { who: 'hero', type: 'walk', direction: 'down' },
            { who: 'hero', type: 'walk', direction: 'left' },

          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            { type: 'changeMap', map: 'Kitchen' },
          ],
        },
      ],
    },
  },
  Kitchen: {
    lowerSrc: 'images/maps/KitchenLower.png',
    upperSrc: 'images/maps/KitchenUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(9),

      }),
    },
    cutsceneSpaces: {
      [
      utils.asGridCoord(5, 10)]: [
        {
          events: [

            { who: 'hero', type: 'stand', direction: 'up' },

          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            { type: 'changeMap', map: 'DemoRoom' },
          ],
        },
      ],
    },
  },
}

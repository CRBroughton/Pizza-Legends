import Sprite from '@/Sprite.js'
import { Config, AddWall } from '@/types/GameObject'
import { CameraPerson } from '@/types/OverworldMap'
import OverworldEvent from '@/OverworldEvent.js'

export default class GameObject {
  x: number
  y: number
  direction: string
  sprite: Sprite
  isMounted: boolean
  hero!: CameraPerson
  id: null
  constructor(config: Config) {
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || 'down'
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || 'images/characters/people/hero.png',
    })

    this.behaviourLoop = config.behaviourLoop || false
    this.behaviourLoopIndex = 0
  }

  mount(map: { addWall: AddWall }) {
    this.isMounted = true
    map.addWall(this.x, this.y)

    // If we have a behaviour, kick off after a short delay
    setTimeout(() => {
      this.doBehaviourEvent(map)
    }, 10)
  }

  async doBehaviourEvent(map) {
    // Dont do anythign if there is a more important cutscene or I don't have config to do anything
    if (map.isCutscenePlaying || this.behaviourLoop.length === 0 || this.isStanding)
      return

    // Setting up our event with relevent info
    const eventConfig = this.behaviourLoop[this.behaviourLoopIndex]
    eventConfig.who = this.id

    // Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig })
    await eventHandler.init()

    // Setting the next event to fire
    this.behaviourLoopIndex++
    if (this.behaviourLoopIndex === this.behaviourLoop.length)
      this.behaviourLoopIndex = 0

    // Do it again
    this.doBehaviourEvent(map)
  }
}

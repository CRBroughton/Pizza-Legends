import Sprite from '@/Sprite.js'
import { Config, AddWall } from '@/types/GameObject'
import { CameraPerson } from '@/types/OverworldMap'

export default class GameObject {
  x: number
  y: number
  direction: string
  sprite: Sprite
  isMounted: boolean
  hero!: CameraPerson
  constructor(config: Config) {
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || 'down'
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || 'images/characters/people/hero.png',
    })
  }

  mount(map: { addWall: AddWall }) {
    this.isMounted = true
    map.addWall(this.x, this.y)
  }
}

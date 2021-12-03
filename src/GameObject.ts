import Sprite from '@/Sprite.js'
import { config, addWall } from '@/types/GameObject'

export default class GameObject {
  x: number
  y: number
  direction: string
  sprite: Sprite
  isMounted: boolean
  constructor(config: config) {
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || 'down'
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || 'images/characters/people/hero.png',
    })
  }

  mount(map: { addWall: addWall }) {
    this.isMounted = true
    map.addWall(this.x, this.y)
  }
}

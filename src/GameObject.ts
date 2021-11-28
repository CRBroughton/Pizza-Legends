import Sprite from './Sprite.js'

export default class GameObject {
  x: any
  y: any
  direction: string
  sprite: Sprite
  constructor(config: { x: number; y: number; direction: string; src?: string }) {
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || 'down'
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || 'images/characters/people/hero.png',
    })
  }

  update() {

  }
}

import GameObject from '@/GameObject.js'
import { drawImage } from '@/interfaces/Sprite'

export default class Sprite {
  image: HTMLImageElement
  isLoaded: boolean | undefined
  useShadow: boolean
  isShadowsLoaded: boolean | undefined
  gameObject: GameObject
  shadow: HTMLImageElement
  constructor(config: { gameObject: any; src: any; animations?: any; currentAnimation?: any }) {
    // Set up the image
    this.image = new Image()
    this.image.src = config.src
    this.image.onload = () => {
      this.isLoaded = true
    }

    // Shadows
    this.shadow = new Image()
    this.useShadow = true
    if (this.useShadow)
      this.shadow.src = 'images/characters/shadow.png'

    this.shadow.onload = () => {
      this.isShadowsLoaded = true
    }

    // Configuring Animation & animation state
    this.animations = config.animations || {
      'idle-down': [[0, 0]],
      'idle-right': [[0, 1]],
      'idle-up': [[0, 2]],
      'idle-left': [[0, 3]],
      'walk-down': [[1, 0], [0, 0], [3, 0], [0, 0]],
      'walk-right': [[1, 1], [0, 1], [3, 1], [0, 1]],
      'walk-up': [[1, 2], [0, 2], [3, 2], [0, 2]],
      'walk-left': [[1, 3], [0, 3], [3, 3], [0, 3]],
    }
    this.currentAnimation = config.currentAnimation || 'idle-down'
    this.currentAnimationFrame = 0

    // Reference the game object
    this.gameObject = config.gameObject
  }

  draw(ctx: { drawImage: drawImage}) {
    const x = this.gameObject.x - 8
    const y = this.gameObject.y - 18

    this.isShadowsLoaded && ctx.drawImage(this.shadow, x, y)

    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32)
  }
}

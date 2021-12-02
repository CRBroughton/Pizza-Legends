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
      idleDown: [
        [0, 0],
      ],
    }
    this.currentAnimation = config.currentAnimation || 'idleDown'
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

import Sprite from './Sprite.js';

export default class GameObject {
    x: any;
    y: any;
    sprite: Sprite;
    constructor(config: { x: number; y: number; src?: string; }) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/people/hero.png",
        });
    }
}
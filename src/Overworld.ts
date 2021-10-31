export default class Overworld {
    element: HTMLDivElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(config: { element: HTMLDivElement; }) {
        this.element = config.element;
        this.canvas = this.element.querySelector('.game-canvas')!;
        this.ctx = this.canvas.getContext('2d')!;
    }

    init() {
        console.log('hello from the overworld', this)

        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        }
        image.src = "images/maps/DemoLower.png";

        const x = 5;
        const y = 6;
        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, // left cut
                0, // top cut
                32,  // width of cut
                32, // height of cut
                x * 16 - 8, // cut compenstation
                y * 16 - 18, 
                32, // width and height of hero
                32)
        }
        hero.src = "images/characters/people/hero.png"
    }
}
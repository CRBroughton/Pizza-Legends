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
    }
}
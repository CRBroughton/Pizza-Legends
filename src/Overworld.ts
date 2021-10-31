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
    }
}
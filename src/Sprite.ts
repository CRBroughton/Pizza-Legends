class Sprite {
    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Configuring Animation & animation state
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        },
        this.currentAnimation = config.currentAnimation || 'idleDown';
        this.currentAnimationFrame = 0;

    }
}
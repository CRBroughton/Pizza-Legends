import Overworld from "./Overworld.js"

(function () {
    console.log('Initialised Game...');

    const overworld = new Overworld({
        element: document.querySelector(".game-container")!
    })

    overworld.init()
})()
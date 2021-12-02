import Overworld from '@/Overworld.js'

(function() {
  // eslint-disable-next-line no-console
  console.log('Initialised Game...')

  const overworld = new Overworld({
    element: document.querySelector('.game-container')!,
  })

  overworld.init()
})()

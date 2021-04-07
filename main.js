import { board } from './src/consts/board.js'
import { game } from './src/consts/general.js'
import { doGame, doGetReady, doGameOver, draw, update } from './src/game.js'

board.addEventListener('click', function (event) {
    switch (game.state.current) {
        case game.state.getReady:
            doGetReady()
            break
        case game.state.game:
            doGame()
            break
        case game.state.over:
            doGameOver()
            break
    }
})

function loop () {
    update()
    draw()
    game.frames++

    requestAnimationFrame(loop)
}
loop()

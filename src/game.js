import { board, boardContext } from './consts/board.js'
import { FLAP, SWOOSHING } from './consts/sfx.js'
import { game, startBtn } from './consts/general.js'
import { background, foreground } from './entities/scenario.js'
import { zambird } from './entities/zambird.js'
import { pipes } from './entities/pipes.js'
import { score, getReady, gameOver } from './entities/states.js'
import { checkClickBounds } from './utils.js'

// Execute the get ready state tasks
function doGetReady () {
    game.state.current = game.state.game
    SWOOSHING.play()
}

// Execute the game main tasks
function doGame () {
    if (zambird.y - zambird.radius <= 0) {
        return -1
    }
    zambird.flap()
    FLAP.play()
}

// Execute the game over tasks
function doGameOver () {
    const rect = board.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    if (checkClickBounds(clickX, clickY, startBtn)) {
        pipes.reset()
        zambird.speedReset()
        score.reset()
        game.state.current = game.state.getReady
    }
}

// Draw every object
function draw () {
    boardContext.fillStyle = '#70c5ce'
    boardContext.fillRect(0, 0, board.width, board.height)

    background.draw()
    pipes.draw()
    foreground.draw()
    zambird.draw()
    getReady.draw()
    gameOver.draw()
    score.draw()
}

// Update objects positions and states
function update () {
    zambird.update()
    foreground.update()
    pipes.update()
}

export { doGame, doGetReady, doGameOver, draw, update }

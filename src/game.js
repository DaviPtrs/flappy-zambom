import { board, boardContext } from './consts/board.js'
import { FLAP, SWOOSHING } from './consts/sfx.js'
import { game } from './consts/general.js'
import { background, foreground } from './entities/scenario.js'
import { zambird } from './entities/zambird.js'
import { pipes } from './entities/pipes.js'
import { score, getReady, gameOver } from './entities/states.js'
import { checkClickBounds, addText } from './utils.js'

// Start button coordinates
const startBtn = {
    x: 120,
    y: 233,
    w: 83,
    h: 29
}

// Barbie button coordinates
const barbieBtn = {
    x: 80,
    y: 265,
    w: 130,
    h: 29
}

// normal mode button coordinates
const normalBtn = {
    x: 80,
    y: 303,
    w: 130,
    h: 29
}

function normalMode () {
    zambird.radius = 13
    zambird.gravity = 0.25
    zambird.jump = 4.6
    pipes.period = 100
    pipes.gap = 85
}

function barbieMode () {
    zambird.radius = 6
    zambird.gravity = 0.23
    zambird.jump = 3.6
    pipes.period = 120
    pipes.gap = 90
}


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


    if (checkClickBounds(clickX, clickY, barbieBtn)){
        boardContext.font = '25px Teko'
        barbieMode()
        alert("Barbie mode enabled")
        
    }

    if (checkClickBounds(clickX, clickY, normalBtn)){
        normalMode()
        alert("Normal mode enabled")
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

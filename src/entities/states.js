import { board, boardContext } from './../consts/board.js'
import { game, sprite } from './../consts/general.js'
import { SCORE_S } from './../consts/sfx.js'

// getReady screen
const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: board.width / 2 - 173 / 2,
    y: 80,

    draw: function () {
        if (game.state.current === game.state.getReady) {
            boardContext.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
        }
    }

}

// gameOver screen
const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: board.width / 2 - 225 / 2,
    y: 90,

    draw: function () {
        if (game.state.current === game.state.over) {
            boardContext.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
        }
    }

}

// score system object
// stores the best score on Local Storage
const score = {
    best: parseInt(localStorage.getItem('best')) || 0,
    value: 0,

    draw: function () {
        boardContext.fillStyle = '#FFF'
        boardContext.strokeStyle = '#000'

        if (game.state.current === game.state.game) { // Main game screen
            boardContext.lineWidth = 2
            boardContext.font = '35px Teko'
            this.addText(this.value, (board.width / 2) - 10, 50)
        } else if (game.state.current === game.state.over) { // gameOver screen
            boardContext.font = '25px Teko'
            this.addText(this.value, 200, 186)
            this.addText(this.best, 200, 228)
        }
    },

    addText: function (text, x, y) {
        boardContext.fillText(text, x, y)
        boardContext.strokeText(text, x, y)
    },

    reset: function () {
        this.value = 0
    },

    increase: function () {
        this.value += 1
        SCORE_S.play()
        if (this.value > this.best) {
            this.best = this.value
            localStorage.setItem('best', this.best)
        }
    }
}

export { getReady, gameOver, score }

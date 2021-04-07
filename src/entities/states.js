import { board, boardContext } from './../consts/board.js'
import { game, sprite } from './../consts/general.js'
import { SCORE_S } from './../consts/sfx.js'
import { addText } from './../utils.js'

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
    h: 270,
    x: board.width / 2 - 225 / 2,
    y: 60,

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
            addText(this.value, (board.width / 2) - 10, 50)
        } else if (game.state.current === game.state.over) { // gameOver screen
            boardContext.font = '25px Teko'
            addText(this.value, 200, 156)
            addText(this.best, 198, 198)
        }
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

const medal = {
    sX : 360,
    sY : 158,
    x : 50,
    y : 145,
    width : 45,
    height : 45,
    
    draw: function(){
        if (game.state.current === game.state.over){
            if (score.value >= 5 && score.value <=10){
                boardContext.drawImage(sprite, this.sX - 48, this.sY - 46, this.width, this.height, this.x, this.y, this.width, this.height) 
            }
            else if(score.value > 10 && score.value <=15){
                boardContext.drawImage(sprite, this.sX, this.sY - 46, this.width, this.height, this.x, this.y, this.width, this.height)
            }
            else if(score.value > 15 && score.value <=20){
                boardContext.drawImage(sprite, this.sX - 48, this.sY, this.width, this.height, this.x, this.y, this.width, this.height)
            }
            else if(score.value > 20){
            boardContext.drawImage(sprite, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height)
            }
        }
    }
}

export { getReady, gameOver, score, medal }

import { board, boardContext } from "./../consts/board.js";
import {game, sprite} from "./../consts/general.js";

// GET READY MESSAGE
const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : board.width/2 - 173/2,
    y : 80,
    
    draw: function(){
        if(game.state.current == game.state.getReady){
            boardContext.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
    
}

// GAME OVER MESSAGE
const gameOver = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : board.width/2 - 225/2,
    y : 90,
    
    draw: function(){
        if(game.state.current == game.state.over){
            boardContext.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
    
}

// SCORE
const score= {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    
    draw : function(){
        boardContext.fillStyle = "#FFF";
        boardContext.strokeStyle = "#000";
        
        if(game.state.current == game.state.game){
            boardContext.lineWidth = 2;
            boardContext.font = "35px Teko";
            boardContext.fillText(this.value, board.width/2, 50);
            boardContext.strokeText(this.value, board.width/2, 50);
            
        }else if(game.state.current == game.state.over){
            // SCORE VALUE
            boardContext.font = "25px Teko";
            boardContext.fillText(this.value, 225, 186);
            boardContext.strokeText(this.value, 225, 186);
            // BEST SCORE
            boardContext.fillText(this.best, 225, 228);
            boardContext.strokeText(this.best, 225, 228);
        }
    },
    
    reset : function(){
        this.value = 0;
    }
}

export {getReady, gameOver, score};
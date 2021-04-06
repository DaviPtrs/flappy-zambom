import { board, boardContext } from "./consts/board.js";
import {FLAP, SWOOSHING} from "./consts/sfx.js";
import {game, startBtn} from "./consts/general.js";
import {background, foreground} from "./entities/scenario.js"
import {zambird} from "./entities/zambird.js"
import {pipes} from "./entities/pipes.js"
import {score, getReady, gameOver} from "./entities/states.js"


function doGetReady() {
    game.state.current = game.state.game;
    SWOOSHING.play();
}

function doGame() {
    if(zambird.y - zambird.radius <= 0){
        return -1;
    } 
    zambird.flap();
    FLAP.play();
}

function doGameOver() {
    let rect = board.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;
    
    // CHECK IF WE CLICK ON THE START BUTTON
    if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
        pipes.reset();
        zambird.speedReset();
        score.reset();
        game.state.current = game.state.getReady;
    }
}

// DRAW
function draw(){
    boardContext.fillStyle = "#70c5ce";
    boardContext.fillRect(0, 0, board.width, board.height);
    
    background.draw();
    pipes.draw();
    foreground.draw();
    zambird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

// UPDATE
function update(){
    zambird.update();
    foreground.update();
    pipes.update();
}

export {doGame, doGetReady, doGameOver, draw, update};
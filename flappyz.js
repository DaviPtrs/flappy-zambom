import { board, boardContext } from "./src/consts/board.js";
import {SCORE_S, FLAP, HIT, SWOOSHING, DIE} from "./src/consts/sfx.js";
import {DEGREE, game, sprite, startBtn} from "./src/consts/general.js";
import {background, foreground} from "./src/entities/scenario.js"
import {zambird} from "./src/entities/zambird.js"
import {pipes} from "./src/entities/pipes.js"
import {score, getReady, gameOver} from "./src/entities/states.js"
import {doGame, doGetReady, doGameOver, draw, update} from "./src/game.js"


// CONTROL THE GAME
board.addEventListener("click", function(event){
    switch(game.state.current){
        case game.state.getReady:
            doGetReady();
            break;
        case game.state.game:
            if (doGame() == -1){
                return;
            }
            break;
        case game.state.over:
            doGameOver();
            break;
    }
});


// LOOP
function loop(){
    update();
    draw();
    game.frames++;
    
    requestAnimationFrame(loop);
}
loop();





import {board} from "./src/consts/board.js";
import {game} from "./src/consts/general.js";
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





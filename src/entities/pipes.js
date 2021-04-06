import { board, boardContext } from "./../consts/board.js";
import {foreground} from "./../entities/scenario.js"
import {game, DEGREE, sprite} from "./../consts/general.js";
import {DIE, HIT, SCORE_S} from "./../consts/sfx.js";
import {zambird} from "./../entities/zambird.js"
import {score, getReady, gameOver} from "./../entities/states.js"

const pipes = {
    position : [],
    
    top : {
        sX : 553,
        sY : 0
    },
    bottom:{
        sX : 502,
        sY : 0
    },
    
    w : 53,
    h : 400,
    gap : 85,
    maxYPos : -150,
    dx : 2,
    
    draw : function(){
        for(let i  = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;
            
            // top pipe
            boardContext.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
            // bottom pipe
            boardContext.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
        }
    },
    
    update: function(){
        if(game.state.current !== game.state.game) return;
        
        if(game.frames%100 == 0){
            this.position.push({
                x : board.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;
            
            // COLLISION DETECTION
            // TOP PIPE
            if(zambird.x + zambird.radius > p.x && zambird.x - zambird.radius < p.x + this.w && zambird.y + zambird.radius > p.y && zambird.y - zambird.radius < p.y + this.h){
                game.state.current = game.state.over;
                HIT.play();
            }
            // BOTTOM PIPE
            if(zambird.x + zambird.radius > p.x && zambird.x - zambird.radius < p.x + this.w && zambird.y + zambird.radius > bottomPipeYPos && zambird.y - zambird.radius < bottomPipeYPos + this.h){
                game.state.current = game.state.over;
                HIT.play();
            }
            
            // MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;
            
            // if the pipes go beyond canvas, we delete them from the array
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },
    
    reset : function(){
        this.position = [];
    }
    
}

export {pipes};
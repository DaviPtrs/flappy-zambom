import { board, boardContext } from "./../consts/board.js";
import {game, sprite} from "./../consts/general.js";
import {HIT, SCORE_S} from "./../consts/sfx.js";
import {zambird} from "./../entities/zambird.js"
import {score} from "./../entities/states.js"

const pipes = {
    // array of pipes on screen
    position : [],
    
    top : {
        sX : 556,
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

        // not adding pipes until the game starts
        if(game.state.current !== game.state.game){
            return;
        } 
        
        // Add pipe on screen every 100 frames interval
        if(game.frames%100 == 0){
            this.position.push({
                x : board.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }


        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;
            
            // Collision test
            if (zambird.front > p.x && zambird.back < (p.x + this.w)){
                // top
                if(zambird.bottom > p.y && zambird.top < (p.y + this.h)){
                    game.state.current = game.state.over;
                    HIT.play();
                }
                // bottom
                if(zambird.bottom > bottomPipeYPos && zambird.top < (bottomPipeYPos + this.h)){
                    game.state.current = game.state.over;
                    HIT.play();
                }

            }
            
            // if bird passed through the pipe
            if(zambird.x === (p.x + this.w)){ 
                score.increase();
            }
            
            // move pipes this.dx distance to the left
            p.x -= this.dx;
            
            // if the pipes go beyond canvas, delete it from the array
            if(p.x + this.w <= 0){
                this.position.shift();
            }

        }
    },
    
    reset : function(){
        this.position = [];
    }
    
}

export {pipes};
import { board, boardContext } from "./../consts/board.js";
import {foreground} from "./../entities/scenario.js"
import {game, DEGREE, sprite} from "./../consts/general.js";
import {DIE} from "./../consts/sfx.js";


const zambird = {
    animation : [
        {sX: 277, sY : 112},
        {sX: 277, sY : 140},
        {sX: 277, sY : 164},
        {sX: 277, sY : 140}
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,
    
    radius : 9,
    
    frame : 0,
    
    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0,
    
    draw : function(){
        let zambird = this.animation[this.frame];
        
        boardContext.save();
        boardContext.translate(this.x, this.y);
        boardContext.rotate(this.rotation);
        boardContext.drawImage(sprite, zambird.sX, zambird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
        
        boardContext.restore();
    },
    
    flap : function(){
        this.speed = - this.jump;
    },
    
    update: function(){
        // IF THE GAME game.state IS GET READY game.state, THE BIRD MUST FLAP SLOWLY
        this.period = game.state.current == game.state.getReady ? 10 : 5;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += game.frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;
        
        if(game.state.current == game.state.getReady){
            this.y = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
            this.rotation = 0 * DEGREE;
        }else{
            this.speed += this.gravity;
            this.y += this.speed;
            
            if(this.y + this.h/2 >= board.height - foreground.h){
                this.y = board.height - foreground.h - this.h/2;
                if(game.state.current == game.state.game){
                    game.state.current = game.state.over;
                    DIE.play();
                }
            }
            
            // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
            if(this.speed >= this.jump){
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            }else{
                this.rotation = -25 * DEGREE;
            }
        }
        
    },
    speedReset : function(){
        this.speed = 0;
    }
}

export {zambird};
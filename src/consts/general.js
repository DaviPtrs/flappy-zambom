const DEGREE = Math.PI/180;


// GAME STATE
const game = {
    frames: 0,
    state : {
        current : 0,
        getReady : 0,
        game : 1,
        over : 2
    }
}

// START BUTTON COORD
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/sprite.png";

export {DEGREE, game, sprite, startBtn};
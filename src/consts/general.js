const DEGREE = Math.PI / 180

// Game object containing states
const game = {
    frames: 0,
    state: {
        current: 0,
        getReady: 0,
        game: 1,
        over: 2
    }
}

// Sprite object
const sprite = new Image()
sprite.src = 'img/sprite.png'

export { DEGREE, game, sprite }

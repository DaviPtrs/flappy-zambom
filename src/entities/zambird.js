import { boardContext } from './../consts/board.js'
import { groundY } from './../entities/scenario.js'
import { game, DEGREE, sprite } from './../consts/general.js'
import { DIE } from './../consts/sfx.js'

// our zambird object. May God bless him
const zambird = {
    // animation position array
    animation: [
        { sX: 277, sY: 112 },
       // { sX: 277, sY: 140 },
       // { sX: 277, sY: 164 },
       // { sX: 277, sY: 140 }
    ],

    // Position and size on canvas
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    // Internal vars
    frame: 0, // Initial animation
    speed: 0, // initial speed
    rotation: 0, // initial rotation

    // Define how easy will hit the camelCase pipe
    radius: 9,

    // Bird boundaries
    top: 0,
    bottom: 0,
    front: 0,
    back: 0,

    // Flap params
    gravity: 0.25, // Gravity that will affect the Y axis
    jump: 4.6, // Jump Y increase

    draw: function () {
        const zambird = this.animation[this.frame]

        // save board before bird rotation
        boardContext.save()
        boardContext.translate(this.x, this.y)
        boardContext.rotate(this.rotation)
        boardContext.drawImage(sprite, zambird.sX, zambird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h)

        // restore board
        boardContext.restore()
    },

    flap: function () {
        this.speed = -this.jump
    },

    update: function () {
        // If game is on getReady state, the bird will flap slowly
        if (game.state.current === game.state.getReady) {
            this.period = 10
        } else {
            this.period = 5
        }

        // Each period, the frame will be incremented by 1
        //if (game.frames % this.period === 0) {
        //    this.frame += 1
        //}

        // Set frame to the animation count range
        //this.frame = this.frame % this.animation.length

        // Reset bird on getReady state
        if (game.state.current === game.state.getReady) {
            this.y = 150
            this.rotation = 0 * DEGREE
        } else {
            this.speed += this.gravity
            this.y += this.speed

            // if bird reach ground, then game over
            if ((this.y + (this.h / 2)) >= groundY) {
                this.y = groundY - this.h / 2
                if (game.state.current === game.state.game) {
                    game.state.current = game.state.over
                    DIE.play()
                }
            }

            // if bird is falling
            if (this.speed >= this.jump) {
                // then rotate down
                this.rotation = 90 * DEGREE
           //     this.frame = 1
            } else {
                // else rotate up
                this.rotation = -25 * DEGREE
            }
        }
        // Updating boundaries
        this.bottom = this.y + this.radius
        this.top = this.y - this.radius
        this.front = this.x + this.radius
        this.back = this.x - this.radius
    },

    speedReset: function () {
        this.speed = 0
    }
}

export { zambird }

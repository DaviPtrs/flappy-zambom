import { boardContext } from './consts/board.js'

// Check if user clicked on object
function checkClickBounds (clickX, clickY, object) {
    if (clickX >= object.x &&
    clickX <= (object.x + object.w) &&
    clickY >= object.y &&
    clickY <= (object.y + object.h)) {
        return true
    } else {
        return false
    }
}

function addText (text, x, y) {
    boardContext.fillText(text, x, y)
    boardContext.strokeText(text, x, y)
}

export { checkClickBounds, addText }

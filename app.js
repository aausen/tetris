const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start-button')
const width = 10;
let nextRandom = 0;
let timerId

// Tetraminoes

const lTetramino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]

const zTetramino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
]

const tTetramino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]

const oTetramino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]

const iTetramino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

const theTetraminoes = [lTetramino, zTetramino, tTetramino, oTetramino, iTetramino]

let currentPosition = 4;
let currentRotation = 0;

// randomly select a tetramino and its first rotation
let random = Math.floor(Math.random()*theTetraminoes.length)
console.log(random)

let current = theTetraminoes[random][currentRotation];

// draw the Tetramino

function draw () {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetramino')
    })
}

// undraw the tetramino
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetramino')
    })
}

// make the tetramino move down every second

// timerId = setInterval(moveDown, 1000)

//assign functions to keycodes
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if(e.keyCode === 38) {
        rotate()
    } else if(e.keyCode === 39) {
        moveRight()
    } else if(e.keyCode === 40) {
        moveDown()
    }
}
document.addEventListener('keyup', control)

function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

// freeze tetraminoes
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start new tetramino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetraminoes.length)
        current = theTetraminoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
    }
}

// move the tetramino to the left, unless is at the edge or a blockage
function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -= 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
    }

    draw()
}

// move the tetramino right, unless is at the edge or a blockage
function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1 )

    if(!isAtRightEdge) currentPosition += 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1
    }

    draw()
}

//rotate the tetramino
function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) { // if the current rotation gets to 4, go back to beginning
        currentRotation = 0
    }
    current = theTetraminoes[random][currentRotation]
    draw()
}

//show up next tetramino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0

//the Tetraminoes without rotations
const upNextTetraminoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetramino
    [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1], //zTetramino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetramino
    [0, 1, displayWidth, displayWidth+1], // oTetramino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetramino
]

// display the upnext shape in the mini-grid
function displayShape() {
    // remove any trace of tetramino from the entire grid
    displaySquares.forEach(square => {
        square.classList.remove('tetramino')
    })
    upNextTetraminoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetramino')
    })
}

//add functionality to button
startButton.addEventListener('click', () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()* theTetraminoes.length)
        displayShape()
    }
})

// splice(), concat(), and appendChild()
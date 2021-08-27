const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start-button')
const width = 10;

// Tetraminos

const lTetramino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width*2+1, width*2],
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

const theTetraminos = [lTetramino, zTetramino, oTetramino, iTetramino]

let currentPosition = 4;
let currentRotation = 0;

// randomly select a tetramino and its first rotation
let random = Math.floor(Math.random()*theTetraminos.length)
console.log(random)

let current = theTetraminos[random][currentRotation];

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

timerId = setInterval(moveDown, 1000)

function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

// freeze tetraminos
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start new tetramino falling
        random = Math.floor(Math.random() * theTetraminos.length)
        current = theTetraminos[random][currentRotation]
        currentPosition = 4
        draw()
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
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
let current = theTetraminos[0][0];

// draw the first rotaion in the first tetramino

function draw () {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetramino')
    })
}
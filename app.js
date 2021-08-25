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
    [width*3, width*2+1, width*3+1, width*2+2]
]
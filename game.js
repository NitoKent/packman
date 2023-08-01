'use strict'

const WALL = '<img id = "wall" src="img/wall.png"width="42" height="45" >'
const FOOD = '<img id = "food" src="img/food.png" width="10" height="10">'
const EMPTY = ' '
const SUPFOOD = '<img id = "food1" src="img/supfood.png" width="30" height="25">'
const CHERRY ='<img id = "food2" src="img/cherry.png" width="30" height="30">'
var gCherryInterval;
const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function showGameOver() {

    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'block'; 
}

function playAgain() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';

    onInit();
}

function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gCherryInterval = setInterval(placeCherry, 15000);
    gGame.score = 0
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []
    // placeCherry()

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
           

            if(i === 1 && j === 1) board[i][j]= SUPFOOD
            if(i === 8 && j === 1) board[i][j]= SUPFOOD
            if(i === 8 && j === 8) board[i][j]= SUPFOOD
            if(i === 1 && j === 8) board[i][j]= SUPFOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    
    return board
}
function placeCherry(){
    const emptyCells =[]
    for(var i = 0;i < gBoard.length;i++){
        for (let j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j });
            }
        }
    }if (emptyCells.length === 0) {
        return;
    }
    const randomIdx = getRandomInt(0, emptyCells.length);
    const cherryLocation = emptyCells[randomIdx];

    // Place the cherry in the random empty cell
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY;
    renderCell(cherryLocation, CHERRY);
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('.score').innerText = gGame.score
   
    if(gGame.score > 60){
        gameOver()
       
    }
}

function gameOver() {

    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    gGame.score = 0
    gGame.isOn = false
    showGameOver()
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
'use strict'

var GHOST =  '<img class = "ghost" src="img/ghost2.png"width="30" height="30" >'
var GHOST1 =  '<img class = "ghost" src="img/ghost4.png"width="30" height="30" >'
var gGhosts = []
OnSuperPacman = false
var gIntervalGhosts

function createGhosts(board) {
    
    gGhosts = []
    for (var i = 0; i < 3; i++) {

        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
  
    const ghost = {
        location: {
            i: 2,
            j: 6,
        },

        currCellContent: FOOD,
       
        
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST1
    
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    
}

function moveGhost(ghost) {
    
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    
    if (nextCell === PACMAN) {
        if(OnSuperPacman){
            removeGhost(nextLocation);
        }else{
        gameOver()
        return
    }
}

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    
    renderCell(ghost.location, ghost.currCellContent)

 
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    ghost.ghostImg = gPacman.isSuper ? GHOST1 : GHOST;
    gBoard[nextLocation.i][nextLocation.j] = ghost.ghostImg
   
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function removeGhost(location) {
    const ghostIdx = gGhosts.findIndex(ghost => ghost.location.i === location.i && ghost.location.j === location.j);
    if (ghostIdx !== -1) {
        gGhosts.splice(ghostIdx, 1);
        gBoard[location.i][location.j] = EMPTY;
        renderCell(location, EMPTY);
    }
}

function getGhostHTML(ghost) {
    if(OnSuperPacman) return `<span>${GHOST1}</span>`
    if(!OnSuperPacman) return `<span>${GHOST}</span>`
}


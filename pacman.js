'use strict'
 const PACMAN = '<img id = "pacman" src="img/pack-man.png"width="42" height="45" >'
 const PACMANTOP ='<img id = "pacman" src="img/pack-man-top.png"width="42" height="45">'
 const PACMANBOT ='<img id = "pacman" src="img/pack-man-botton.png"width="42" height="45">'
 const PACMANRIG ='<img id = "pacman" src="img/pack-man-right.png"width="42" height="45">'
 var gPacma
 let OnSuperPacman = false;

function createPacman(board) {

    gPacman = {
        location: {
            i: 2,
            j: 3
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {

    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
   
    if (nextCell === WALL) return

    if(nextCell === SUPFOOD){

        if(OnSuperPacman) return
    
        OnSuperPacman = true; 
        setTimeout(function(){
            OnSuperPacman = false;
        },5000)

    }
    if(OnSuperPacman){
        if(nextCell === GHOST){
            removeGhost(nextLocation)
        }
    }
    else {  
      if (nextCell === GHOST) {
        gameOver()
        return
      }
    }

    if (nextCell === FOOD) updateScore(1)
    if (nextCell ===CHERRY)updateScore(10)

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    gPacman.dir = ev.key; 
    renderCell(gPacman.location, EMPTY);

    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation

    renderCell(nextLocation, getPacmanHTML(gPacman));
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
   
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
function getPacmanHTML(gPacman) {
        if (gPacman.dir === 'ArrowUp') return `<span>${PACMANTOP}</span>`;
        if (gPacman.dir === 'ArrowRight') return `<span>${PACMANRIG}</span>`;
        if (gPacman.dir === 'ArrowDown') return `<span>${PACMANBOT}</span>`;
        if (gPacman.dir === 'ArrowLeft') return `<span>${PACMAN}</span>`;
    }

const Config = {
    WIDTH: 10,
    HEIGHT: 20,
    BLOCKSIZE: 20,
    GAMESPEED: 100,
    BLOCKTYPES : ['red', 'blue']
}


function boardSetup (sizeX, sizeY){
    let boardArray = [];
    for(let i = 0; i < sizeY; i++){
        boardArray[i] = [];
        for(let j = 0; j < sizeX; j++){
                boardArray[i][j] = null;
        }
    }
    return boardArray;
}

function drawBoard(boardRef, boardSetup, blockSize = Config.BLOCKSIZE){
    boardRef.style.width = `${blockSize*boardSetup[0].length}px`;
    boardRef.style.height= `${blockSize*boardSetup.length}px`;
    boardRef.innerHTML = '';
    boardSetup.forEach(function (row, rowIndex){
        row.forEach(function(field, columnIndex){
            if(field){
                let block = document.createElement('div');    
                block.style.position = 'absolute';
                block.style.width = `${blockSize}px`;
                block.style.height= `${blockSize}px`;
                
                block.style.top = `${blockSize * rowIndex}px`;
                block.style.left = `${blockSize * columnIndex}px`;
                block.classList.add(`block-type-${field.type}`)
                block.classList.add('block');
                boardRef.append(block);
            }
        });
    })
}

function addSegment(boardSetup){
    const center = Math.floor((boardSetup[0].length-1)/2);
    addBlock(boardSetup, center, 0);
    addBlock(boardSetup, center +1, 0);
    addBlock(boardSetup, center, 1);
    addBlock(boardSetup, center +1, 1);
}

function addBlock(boardSetup, posX, posY, blockType = Config.BLOCKTYPES){
    boardSetup[posY][posX] = {
        type: blockType[Math.floor(Math.random() * blockType.length)], 
        run : true  
    }
}

function updateBlock(boardSetup) {
    for(let i = boardSetup.length -1; i >= 0; i--){
        for(let j = boardSetup[i].length -1; j >= 0; j--){
            if(boardSetup[i][j]){
                const canMove = i + 1 < boardSetup.length && boardSetup[i+1][j] == null;
                if(canMove){
                        boardSetup[i+1][j] = boardSetup[i][j];
                        boardSetup[i][j] = null; 
                } else {
                        boardSetup[i][j].run = false;
                }
            }
        } 
    } 

}

const boardRef = document.getElementById('game-board');
const board = boardSetup(Config.WIDTH, Config.HEIGHT);
addSegment(board);
setInterval(function(){
    updateBlock(board);
    drawBoard(boardRef, board);

    if(!getElementsMoving(board)){
        addSegment(board);
    }
}, Config.GAMESPEED);



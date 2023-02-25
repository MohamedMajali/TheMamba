//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//player head
var mambaX = blockSize * 5;
var mambaY = blockSize * 5;

//player speed
var velocityX = 0;
var velocityY = 0;

var mambaBody = [];


//the food
var prayX;
var prayY;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    showPray();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10);
    //100 milsecs.
}

function update() {
    context.fillStyle="purple";
    context.fillRect(0, 0, board.width, board.height);
   
    context.fillStyle="gold";
    context.fillRect(prayX, prayY, blockSize, blockSize);
    if (mambaX == prayX && mambaY == prayY) {
        mambaBody.push([prayX, prayY])
        showPray();
    }

    for (let i = mambaBody.length-1; i > 0; i--) {
        mambaBody[i]= mambaBody[i-1];    
    }
    if (mambaBody.length) {
        mambaBody[0] = [mambaX, mambaY];
    }

    context.fillStyle="black";
    mambaX += velocityX * blockSize;
    mambaY += velocityY * blockSize;
    context.fillRect(mambaX, mambaY, blockSize, blockSize);
    for(let i = 0; i < mambaBody.length; i++) {
        context.fillRect(mambaBody[i][0], mambaBody[i][1], blockSize, blockSize);

    }
   
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }

}

function showPray() {
    //returns random number multiplied by cols and/or rows
    prayX = Math.floor(Math.random() * cols) * blockSize;
    prayY = Math.floor(Math.random() * rows) * blockSize;
}

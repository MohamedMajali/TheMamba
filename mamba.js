var blockSize = 25;
var rows = 30;
var cols = 40;
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

var gameLoop;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    showPray();
    document.addEventListener("keyup", changeDirection);
    gameLoop = setInterval(update, 1000/10);
}

function update() {
    context.fillStyle="purple";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="gold";
    context.fillRect(prayX, prayY, blockSize, blockSize);

    if (mambaX == prayX && mambaY == prayY) {
        mambaBody.push([prayX, prayY]);
        showPray();
    }

    for (let i = mambaBody.length-1; i > 0; i--) {
        mambaBody[i] = mambaBody[i-1];
    }
    if (mambaBody.length) {
        mambaBody[0] = [mambaX, mambaY];
    }

    context.fillStyle="black";
    mambaX += velocityX * blockSize;
    mambaY += velocityY * blockSize;

    // Teleport snake to opposite side when it goes off board
    if (mambaX < 0) {
        mambaX = board.width - blockSize;
    } else if (mambaX >= board.width) {
        mambaX = 0;
    } else if (mambaY < 0) {
        mambaY = board.height - blockSize;
    } else if (mambaY >= board.height) {
        mambaY = 0;
    }

    // Game Over when snake eats itself
    for (let i = 0; i < mambaBody.length; i++) {
        if (mambaX == mambaBody[i][0] && mambaY == mambaBody[i][1]) {
            gameOver();
            return;
        }
    }

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

function gameOver() {
    clearInterval(gameLoop); // Stop the game loop
    context.fillStyle = "red";
    context.fillRect(0, 0, board.width, board.height);
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over", board.width / 2, board.height / 2);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.style.position = "absolute";
    restartButton.style.color = "white"
    restartButton.style.backgroundColor = "blue"
    restartButton.style.borderRadius  = "50%"
    restartButton.style.width = "100px"
    restartButton.style.height = "70px"
    restartButton.style.top = board.offsetTop + board.height + 30 + "px";
    restartButton.style.left = board.offsetLeft + (board.width - restartButton.offsetWidth) / 2 + "px";
    restartButton.addEventListener("click", restartGame);
    document.body.appendChild(restartButton);
}


function restartGame() {
    // Reset snake position and body
    mambaX = blockSize * 5;
    mambaY = blockSize * 5;
    mambaBody = [];
    velocityX = 0;
    velocityY = 0;
    
    // Remove restart button
    const restartButton = document.querySelector("button");
    restartButton.parentNode.removeChild(restartButton);

    // Start game loop again
    gameLoop = setInterval(update, 1000/10);
}


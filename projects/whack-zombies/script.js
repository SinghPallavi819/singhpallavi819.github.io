let currPlantTile;
let currZomTile;
let score = 0;
let gameOver = false;
let plantInterval;
let zombieInterval;

window.onload = function() {
    initializeBoard();
}

function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
}

function startGame() {
    document.getElementById('start').style.display = 'none';
    resetGame();
    plantInterval = setInterval(setPlant, 1000);
    zombieInterval = setInterval(setZombie, 2000);
}

function resetGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();
    currPlantTile = null;
    currZomTile = null;
    clearTiles();
}

function clearTiles() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./images/flower.webp";

    let num = getRandomTile();
    if (currZomTile && currZomTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function setZombie() {
    if (gameOver) {
        return;
    }
    if (currZomTile) {
        currZomTile.innerHTML = "";
    }
    let zombie = document.createElement("img");
    zombie.src = "./images/zombie.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currZomTile = document.getElementById(num);
    currZomTile.appendChild(zombie);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currPlantTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currZomTile) {
        document.getElementById("score").innerText = "GAME OVER " + score.toString();
        gameOver = true;
        clearInterval(plantInterval);
        clearInterval(zombieInterval);
        document.getElementById('start').innerText = 'Start Over';
        document.getElementById('start').style.display = 'inline-block';
    }
}

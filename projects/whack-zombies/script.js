let currPlantTile;
let currZomTile;
let score = 0;
let gameOver = false;
let plantInterval;
let zombieInterval;
let plantSound = document.getElementById("plantSound");
let zombieSound = document.getElementById("zombieSound");
let gameOverSound = document.getElementById("gameOverSound");

window.onload = function() {
    initializeBoard();
    resizeBoard(); // Initial resize
}

// Function to initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
}

// Start the game
function startGame() {
    document.getElementById('start').style.display = 'none';
    resetGame();
    plantInterval = setInterval(setPlant, 1000);
    zombieInterval = setInterval(setZombie, 2000);
}

// Reset the game
function resetGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();
    currPlantTile = null;
    currZomTile = null;
    clearTiles();
    gameOverSound.pause(); // Pause game over sound if it's still playing
    gameOverSound.currentTime = 0; // Reset sound position
}

// Clear all tiles
function clearTiles() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
    }
}

// Get a random tile
function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

// Set a plant on a random tile
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

// Set a zombie on a random tile
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

    // Play zombie sound
    playZombieSound();
}

// Handle tile selection
function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currPlantTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
        // Play plant sound
        playPlantSound();
    } else if (this == currZomTile) {
        document.getElementById("score").innerText = "GAME OVER " + score.toString();
        gameOver = true;
        clearInterval(plantInterval);
        clearInterval(zombieInterval);
        playGameOverSound();
        document.getElementById('start').innerText = 'Start Over';
        document.getElementById('start').style.display = 'inline-block';
    }
}

// Play plant sound
function playPlantSound() {
    plantSound.currentTime = 0; // Rewind to the start
    plantSound.play();
}

// Play zombie sound
function playZombieSound() {
    zombieSound.currentTime = 0; // Rewind to the start
    zombieSound.play();
}

// Play game over sound
function playGameOverSound() {
    gameOverSound.currentTime = 0; // Rewind to the start
    gameOverSound.play();
}

// Adjust board size for responsive design
function resizeBoard() {
    let board = document.getElementById('board');
    let boardSize = Math.min(window.innerWidth, window.innerHeight) * 0.8; // 80% of the smallest dimension

    board.style.width = `${boardSize}px`;
    board.style.height = `${boardSize}px`;

    let tiles = document.querySelectorAll('#board div');
    tiles.forEach(tile => {
        tile.style.width = `${boardSize / 3}px`;
        tile.style.height = `${boardSize / 3}px`;
    });
}

// Call resizeBoard on window resize
window.addEventListener('resize', resizeBoard);

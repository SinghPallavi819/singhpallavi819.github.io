let currPlantTile;
let currZomTile;
let score = 0;
let gameOver = false;
let plantInterval;
let zombieInterval;
let gameOverAudio = document.getElementById("gameOverSound"); // Get reference to game over audio

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
    gameOverAudio.pause(); // Pause game over sound if it's still playing
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

    // Play plant sound
    playPlantSound();
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

    // Play zombie sound
    playZombieSound();
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currPlantTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
        // Play plant whack sound
        playPlantWhackSound();
    } else if (this == currZomTile) {
        document.getElementById("score").innerText = "GAME OVER " + score.toString();
        gameOver = true;
        clearInterval(plantInterval);
        clearInterval(zombieInterval);
        // Play game over sound
        playGameOverSound();
        document.getElementById('start').innerText = 'Start Over';
        document.getElementById('start').style.display = 'inline-block';
    }
}

// Function to play plant sound
function playPlantSound() {
    var sound = document.getElementById("plantSound");
    sound.currentTime = 0; // Rewind to the start
    sound.play();
}

// Function to play zombie sound
function playZombieSound() {
    var sound = document.getElementById("zombieSound");
    sound.currentTime = 0; // Rewind to the start
    sound.play();
}

// Function to play plant whack sound
function playPlantWhackSound() {
    // Example: Play a short whack sound for plant
    // Adjust based on your sound file
    var sound = new Audio('./sounds/plant_whack.mp3');
    sound.volume = 0.5; // Example volume adjustment
    sound.play();
}

// Function to play game over sound
function playGameOverSound() {
    gameOverAudio.currentTime = 0; // Rewind to the start
    gameOverAudio.play();
}

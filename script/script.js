const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let board = createBoard(boardFieldsAmount);
let gameRunning = true;

const players = initPlayers(playersData);

addEventListener("keydown", handleKeydownEvent);

function gameLoop() {
    render();
    if (gameRunning)
        requestAnimationFrame(gameLoop);
}

gameLoop();
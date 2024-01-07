function createBoard(boardFieldsAmount) {
    const board = [];
    for (let i = 0; i < boardFieldsAmount; i++) {
        const row = [];
        for (let j = 0; j < boardFieldsAmount; j++) {
            row.push({ hasMine: ((Math.random() > 0.8) ? true : false), hasFlag: false, isDigged: false });
        }
        board.push(row);
    }
    return board;
}

function initPlayers(playersData) {
    const players = [];

    playersData.forEach((data) => {
        players.push(new Player(data));
    });

    return players;
}

function finishGame() {

}

function loose() {

}

function checkIfWin() {

}

function reset() {

}

function render() {
    //update canvas size
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    //clear board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();

    //draw board
    const boardPos = {
        x: (canvas.width - canvas.height * 8 / 10) / 2,
        y: canvas.height / 10
    }

    const boardSize = canvas.height * 8 / 10;
    const boardFieldSize = boardSize / boardFieldsAmount;
    const diggedFields = [];
    for (let i = 0; i < boardFieldsAmount; i++) {
        for (let j = 0; j < boardFieldsAmount; j++) {
            ctx.beginPath();
            if (board[i][j].isDigged) {
                ctx.fillStyle = "grey";
                if (board[i][j].isDigged != 10)
                    diggedFields.push({ minesAmount: board[i][j].isDigged, pos: { x: j, y: i } });
            } else if (board[i][j].hasFlag) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "green";
            }
            ctx.fillRect(boardPos.x + j * boardFieldSize, boardPos.y + i * boardFieldSize, boardFieldSize, boardFieldSize);
            ctx.closePath();
        }
    }
    //adding numbers of mines to fields
    diggedFields.forEach(({ minesAmount, pos }) => {
        ctx.beginPath();
        switch (minesAmount) {
            case 1: ctx.fillStyle = "white"; break;
            case 2: ctx.fillStyle = "green"; break;
            case 3: ctx.fillStyle = "yellow"; break;
            case 4: ctx.fillStyle = "orange"; break;
            case 5: ctx.fillStyle = "red"; break;
            case 6: ctx.fillStyle = "purple"; break;
            case 7: ctx.fillStyle = "blue"; break;
            case 8: ctx.fillStyle = "brown"; break;
        }

        ctx.font = `${ boardFieldSize }px serif`;
        ctx.fillText(board[pos.y][pos.x].isDigged, boardPos.x + (pos.x + 0.25) * boardFieldSize, boardPos.y + (pos.y + 0.9) * boardFieldSize);
        ctx.closePath();
    })

    //draw players
    players.forEach((player) => {
        player.draw(boardPos, boardFieldSize);
    })
}

function handleKeydownEvent({ key }) {
    players.forEach((player) => {
        if (player.data.keyBinds.leftKey == key) {
            player.move({ x: -1, y: 0 }, boardFieldsAmount);
        }
        if (player.data.keyBinds.rightKey == key) {
            player.move({ x: 1, y: 0 }, boardFieldsAmount);
        }
        if (player.data.keyBinds.upKey == key) {
            player.move({ x: 0, y: -1 }, boardFieldsAmount);
        }
        if (player.data.keyBinds.downKey == key) {
            player.move({ x: 0, y: 1 }, boardFieldsAmount);
        }
        if (player.data.keyBinds.digKey == key) {
            player.dig();
        }
        if (player.data.keyBinds.placeFlagKey == key) {
            player.placeFlag();
        }
    })
}

function getAmountOfMinesAround(pos) {
    let amountOfMines = 0;
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (pos.y - 1 + i >= 0 && pos.y - 1 + i <= boardFieldsAmount - 1 && pos.x - 1 + j >= 0 && pos.x - 1 + j <= boardFieldsAmount - 1) {
                if (board[pos.y - 1 + i][pos.x - 1 + j].hasMine) {
                    console.log("mine");
                    amountOfMines++;
                }
            }
        }
    }
    if (amountOfMines > 0)
        return amountOfMines;
    return 10;
}
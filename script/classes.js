class KeyBinds {
    constructor(leftKey, rightKey, upKey, downKey, placeFlagKey, digKey) {
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey;
        this.downKey = downKey;
        this.placeFlagKey = placeFlagKey;
        this.digKey = digKey;
    }
}

class Player {
    constructor(data) {
        this.data = data;
        this.pos = { x: 0, y: 0 };
    }

    placeFlag() {
        if (!board[this.pos.y][this.pos.x].isDigged) {
            board[this.pos.y][this.pos.x].hasFlag = !board[this.pos.y][this.pos.x].hasFlag;
        }
    }

    dig() {
        if (!board[this.pos.y][this.pos.x].isDigged) {
            if (!board[this.pos.y][this.pos.x].hasMine) {
                console.log("no mine");
                board[this.pos.y][this.pos.x].isDigged = getAmountOfMinesAround(this.pos);
                board[this.pos.y][this.pos.x].hasFlag = false;
            } else loose();
        }
    }

    draw(boardPos, boardFieldSize) {
        ctx.beginPath();
        ctx.fillStyle = this.data.coursorColor;
        ctx.rect(boardPos.x + this.pos.x * boardFieldSize, boardPos.y + this.pos.y * boardFieldSize, boardFieldSize, 1);
        ctx.rect(boardPos.x + this.pos.x * boardFieldSize, boardPos.y + (this.pos.y + 1) * boardFieldSize - 1, boardFieldSize, 1);
        ctx.rect(boardPos.x + this.pos.x * boardFieldSize, boardPos.y + this.pos.y * boardFieldSize, 1, boardFieldSize);
        ctx.rect(boardPos.x + (this.pos.x + 1) * boardFieldSize - 1, boardPos.y + this.pos.y * boardFieldSize, 1, boardFieldSize);
        ctx.fill();
        ctx.closePath();
    }

    move(pos, boardSize) {
        if (this.pos.x + pos.x >= 0 && this.pos.x + pos.x < boardSize) {
            this.pos.x += pos.x;
        }
        if (this.pos.y + pos.y >= 0 && this.pos.y + pos.y < boardSize) {
            this.pos.y += pos.y;
        }
    }
}
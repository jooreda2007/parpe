const board = document.getElementById('board');
const rollDiceButton = document.getElementById('rollDice');
const message = document.getElementById('message');
const playerTurnDisplay = document.getElementById('playerTurn');
const boardSize = 10;
const player1 = { position: 0, element: null, color: 'red' };
const player2 = { position: 0, element: null, color: 'blue' };
let currentPlayer = player1;
let squares = [];

const ladders = {
    3: 22,
    5: 8,
    11: 26,
    20: 29,
    27: 1,
    21: 9,
    17: 4,
    19: 7
};

function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = `square-${i}`;
        board.appendChild(square);
        squares.push(square);
    }
    player1.element = document.createElement('div');
    player1.element.classList.add('player', 'player1');
    player2.element = document.createElement('div');
    player2.element.classList.add('player', 'player2');
    updatePlayerPosition(player1);
    updatePlayerPosition(player2);
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updatePlayerPosition(player) {
    squares[player.position].appendChild(player.element);
}

function movePlayer(player, steps) {
    player.position += steps;
    if (player.position >= boardSize * boardSize - 1) {
        player.position = boardSize * boardSize - 1;
        message.textContent = `${currentPlayer.color === 'red' ? 'اللاعب الأحمر' : 'اللاعب الأزرق'} فاز!`;
        rollDiceButton.disabled = true;
    }
    if (ladders[player.position] !== undefined) {
        player.position = ladders[player.position];
    }
    updatePlayerPosition(player);
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playerTurnDisplay.textContent = `دور ${currentPlayer.color === 'red' ? 'اللاعب الأحمر' : 'اللاعب الأزرق'}`;
}

rollDiceButton.addEventListener('click', () => {
    const diceRoll = rollDice();
    message.textContent = `تم رمي الزهر وحصلت على ${diceRoll}`;
    movePlayer(currentPlayer, diceRoll);
    switchPlayer();
});

createBoard();
playerTurnDisplay.textContent = `دور اللاعب الأحمر`;
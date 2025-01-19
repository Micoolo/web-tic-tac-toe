const gameStatus = document.getElementById("status");
const countX = document.getElementById("playerX");
const countO = document.getElementById("playerO");
const countDraws = document.getElementById("draws");
const fields = document.querySelectorAll(".field");

let currentPlayer = 'X';
let sign = 'O'; // algorithm
let opSign = 'X'; // player
let gameActive = true;
let isRunning = false;
let isAlgorithmRunning = false;
let boardSize, winningCombinations;
let playerMovesFirst = true;

//checking if its a 3x3 or 4x4 board
if(document.getElementById("board3x3")) {
    boardSize = 3;
    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
} else if (document.getElementById("board4x4")) {
    boardSize = 4;
    winningCombinations = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];
}
let board = Array(boardSize * boardSize).fill(null);

function startGame() {
    if (!isRunning) {
        isRunning = true;

        sideButton.forEach(button => {
            button.classList.add("disabled");
        });

        if (currentPlayer === sign) {
            setTimeout(() => {
                algorithmMove();
            }, 500);
        }

        gameStatus.textContent = `Turn of Player ${currentPlayer}`;
    }
}

function fieldClick(event) {
    const index = event.target.dataset.index;
    
    if (board[index] !== null || !gameActive) return; 

    //adding the click animation class and removing it after its done 
    event.target.classList.add('clickAnimation');
    event.target.addEventListener('animationend', () => {
        event.target.classList.remove('clickAnimation');
    }, { once: true });
    
    //adding text and class to clicked field
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());

    if (checkWin(currentPlayer)) {
        highlightWinningFields();
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        pointsCounter();
        gameEnded();
        return;
    }
    
    if (checkDraw()) {
        gameStatus.textContent = 'Draw!';
        countDraws.textContent = parseInt(countDraws.textContent) + 1;
        gameEnded();
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Turn of Player ${currentPlayer}`;
}

fields.forEach(field => field.addEventListener('click', event => {
    if (isAlgorithmRunning || currentPlayer === "O") return;
    if (!isRunning) {
        isRunning = true;
        
        sideButton.forEach(button => {
            button.classList.add("disabled");
        });
    }
    fieldClick(event);
    if (currentPlayer === sign && gameActive) {
        setTimeout(algorithmMove, 500);
    }
}));

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}


function checkDraw() {
    return board.every(field => field !== null) && !checkWin(sign) && !checkWin(opSign);
    
}

function highlightWinningFields() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            combination.forEach(index => {
                fields[index].classList.add('winner');
            });
        }
    });
}

async function restartGame() {
    if (visualization) {
        cancelAnimation = true;
        while (isAlgorithmRunning) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
    board = Array(boardSize*boardSize).fill(null);
    fields.forEach(field => {
        field.textContent = '';
        field.classList.remove('x', 'o', 'winner', 'blank');
        field.style.color = 'black';
    });
    if (playerMovesFirst) {
        currentPlayer = 'X';
    } else {
        currentPlayer = 'O';
    }
    gameStatus.textContent = `Turn of Player ${currentPlayer}`;
    gameActive = true;
    isRunning = false;
    sideButton.forEach(button => {
        button.classList.remove("disabled");
    });
    cancelAnimation = false;
}


function gameEnded() {
    gameActive = false;
    isRunning = false;
    fields.forEach(field => { 
        if (!field.classList.contains('winner')) {
            field.classList.add('blank');
        }
    });
}

function pointsCounter() {
    if(currentPlayer == 'X') {
        countX.textContent = parseInt(countX.textContent) + 1;
    } else if (currentPlayer == 'O') {
        countO.textContent = parseInt(countO.textContent) + 1;
    }
}

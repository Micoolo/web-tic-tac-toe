let maxDepth = 9;
let visualization = true;
let visualizationSpeed = 1000;
async function algorithmMove () {
    if (!gameActive) return;
    isAlgorithmRunning = true;
    
    let bestPosition = -1;
    let moveValues = Array(board.length).fill(null); 

    if (maxDepth === 0) {
        bestPosition = makeRandomMove();
    } else {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = currentPlayer;
                let score = minimax (-Infinity, Infinity, 0, false);
                board[i] = null;
                moveValues[i] = score;
                if (score > bestScore) {
                    bestScore = score;
                    bestPosition = i;
                }
            }
        }
        if (visualization) {
            await displayMoveValues(moveValues);
        }
    }
    if (bestPosition !== -1) {
        board[bestPosition] = currentPlayer;
        fields[bestPosition].textContent = currentPlayer;
        fields[bestPosition].classList.add(currentPlayer.toLowerCase());
        
        if (checkWin(sign)) {
            highlightWinningFields();
            gameStatus.textContent = `Player ${sign} wins!`;
            pointsCounter();
            gameEnded();
            isAlgorithmRunning = false;
            return;
        }

        if (checkDraw()) {
            gameStatus.textContent = 'Draw!';
            countDraws.textContent = parseInt(countDraws.textContent) + 1;
            gameEnded();
            isAlgorithmRunning = false;
            return;
        }

        currentPlayer = opSign;
        gameStatus.textContent = `Turn of Player ${currentPlayer}`;
        isAlgorithmRunning = false;
    }
}

function getAvailableMoves() {
    let moves = [];

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            moves.push(i);
        }
    }
    
    return moves;
}

function makeRandomMove() {
    let availableMoves = getAvailableMoves();

    if (availableMoves.length === 0) {
        return null;
    }

    let randomIndex = Math.floor(Math.random() * availableMoves.length);

    let move = availableMoves[randomIndex];

    return move;
}

function minimax (alpha, beta, depth, isMaximizingPlayer) {
    if (checkDraw() || depth > maxDepth) {
        return 0;
    }

    if (checkWin(sign)) {
        return 100 - depth;
    }

    if (checkWin(opSign)) {
        return -100 + depth;
    }

    if(isMaximizingPlayer) {
        let bestScore = -Infinity;
        for(let i = 0; i < board.length; i++) {
            if(board[i] === null) {
                board[i] = sign;
                isMaximizingPlayer = false;
                let score = minimax(alpha, beta, depth + 1, isMaximizingPlayer);
                board[i] = null;
                isMaximizingPlayer = true;
                bestScore = Math.max(bestScore, score);
                alpha = Math.max(alpha, bestScore);
                if (alpha >= beta) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for(let i = 0; i < board.length; i++) {
            if(board[i] === null) {
                board[i] = opSign;
                isMaximizingPlayer = true;
                let score = minimax(alpha, beta, depth + 1, isMaximizingPlayer);
                board[i] = null;
                isMaximizingPlayer = false;
                bestScore = Math.min(bestScore, score);
                beta = Math.min(beta, bestScore);
                if (alpha >= beta) {
                    break;
                }
            }
        }
        return bestScore;
    }
}

async function displayMoveValues(moveValues) {
    for (let i = 0; i < moveValues.length; i++) {
        if (moveValues[i] !== null) {
            const field = fields[i];
            const originalText = field.textContent;
            field.textContent = moveValues[i];
            field.style.color = moveValues[i] > 0 ? 'rgb(113, 168, 30)' : moveValues[i] < 0 ? 'red' : 'black';
            await new Promise(resolve => setTimeout(resolve, visualizationSpeed));
            field.textContent = originalText;
            field.style.color = 'black';
        }
    }
}

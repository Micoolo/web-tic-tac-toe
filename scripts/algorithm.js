let maxDepth = 8;

function algorithmMove () {
    if (!gameActive) return;

    let bestScore = -Infinity;
    let bestPosition = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = currentPlayer;
            let score = minimax (-Infinity, Infinity, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestPosition = i;
            }
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
            return;
        }

        if (checkDraw()) {
            gameStatus.textContent = 'Draw!';
            countDraws.textContent = parseInt(countDraws.textContent) + 1;
            gameEnded();
            return;
        }

        currentPlayer = opSign;
        gameStatus.textContent = `Turn of Player ${currentPlayer}`;
    }
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
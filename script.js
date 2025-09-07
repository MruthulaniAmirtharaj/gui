document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const statusDisplay = document.getElementById('status-display');
    const newGameButton = document.getElementById('new-game-button');
    
    let boardState;
    let currentPlayer;
    let selectedSquare;
    let legalMoves;
    let isCheck;
    let gameOver;

    const initialBoardState = [
        [null, null, null, null, { type: 'giraffe', color: 'black' }, { type: 'giraffe', color: 'black' }, null, null, null, null],
        [null, { type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }, null],
        [null, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, null],
        Array(10).fill(null), Array(10).fill(null), Array(10).fill(null), Array(10).fill(null),
        [null, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, null],
        [null, { type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }, null],
        [null, null, null, null, { type: 'giraffe', color: 'white' }, { type: 'giraffe', color: 'white' }, null, null, null, null],
    ];

    const pieceSymbols = { 
        white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙', giraffe: '🦒' },
        black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟', giraffe: '🦒' }
    };

    function initializeGame() {
        boardState = JSON.parse(JSON.stringify(initialBoardState));
        currentPlayer = 'white';
        selectedSquare = null;
        legalMoves = [];
        isCheck = false;
        gameOver = false;
        newGameButton.style.display = 'none';
        createBoardUI();
        renderPieces();
        updateStatus();
    }

    newGameButton.addEventListener('click', initializeGame);

    function handleSquareClick(e) {
        if (gameOver) return;
        const clickedSquare = e.currentTarget;
        const row = parseInt(clickedSquare.dataset.row);
        const col = parseInt(clickedSquare.dataset.col);
        if (selectedSquare) {
            const isLegalMove = legalMoves.some(move => move[0] === row && move[1] === col);
            if (isLegalMove) {
                movePiece({ row: parseInt(selectedSquare.dataset.row), col: parseInt(selectedSquare.dataset.col) }, { row, col });
            }
            clearSelection();
        } else {
            const piece = boardState[row][col];
            if (piece && piece.color === currentPlayer) {
                selectPiece(clickedSquare);
            }
        }
    }

    function selectPiece(square) {
        clearSelection();
        selectedSquare = square;
        selectedSquare.classList.add('selected');
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        legalMoves = getLegalMovesForPiece(row, col);
        showLegalMoveHints();
    }
    
    function movePiece(from, to) {
        const piece = boardState[from.row][from.col];
        boardState[to.row][to.col] = piece;
        boardState[from.row][from.col] = null;
        clearSelection();
        switchPlayer();
        renderPieces();
        checkGameState();
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer === 'white' ? 'black' : 'white');
        const kingPos = findKing(boardState, currentPlayer);
        isCheck = kingPos ? isSquareAttacked(boardState, kingPos.row, kingPos.col, (currentPlayer === 'white' ? 'black' : 'white')) : false;
    }
    
    function clearSelection() {
        if (selectedSquare) {
            selectedSquare.classList.remove('selected');
        }
        document.querySelectorAll('.hint').forEach(hint => hint.remove());
        selectedSquare = null;
        legalMoves = [];
    }
    
    function showLegalMoveHints() {
        legalMoves.forEach(move => {
            const [row, col] = move;
            const square = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            if (square) {
                const hint = document.createElement('div');
                hint.classList.add('hint');
                if (boardState[row][col] !== null) {
                    hint.classList.add('capture-hint');
                } else {
                    hint.classList.add('legal-move-hint');
                }
                square.appendChild(hint);
            }
        });
    }

    function updateStatus() {
        if (gameOver) return;
        let status = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`;
        if (isCheck) {
            status += ' - Check!';
        }
        statusDisplay.textContent = status;
    }

    function checkGameState() {
        if (gameOver) return;
        const whiteKingPos = findKing(boardState, 'white');
        if (whiteKingPos && whiteKingPos.row === 0 && (whiteKingPos.col === 4 || whiteKingPos.col === 5)) {
            endGame("White wins by Crowning!"); return;
        }
        const blackKingPos = findKing(boardState, 'black');
        if (blackKingPos && blackKingPos.row === 9 && (blackKingPos.col === 4 || blackKingPos.col === 5)) {
            endGame("Black wins by Crowning!"); return;
        }
        let hasAnyLegalMove = false;
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (!isSquareOnBoard(r, c)) continue;
                const piece = boardState[r][c];
                if (piece && piece.color === currentPlayer) {
                    if (getLegalMovesForPiece(r, c).length > 0) {
                        hasAnyLegalMove = true;
                        break;
                    }
                }
            }
            if (hasAnyLegalMove) break;
        }
        if (!hasAnyLegalMove) {
            const opponent = currentPlayer === 'white' ? 'Black' : 'White';
            if (isCheck) { endGame(`Checkmate! ${opponent} wins.`); } 
            else { endGame(`Stalemate! ${opponent} wins.`); }
        } else {
            updateStatus();
        }
    }

    function endGame(message) {
        gameOver = true;
        statusDisplay.textContent = message;
        newGameButton.style.display = 'inline-block';
        clearSelection();
    }
    
    function getLegalMovesForPiece(row, col) {
        const piece = boardState[row][col];
        if (!piece) return [];
        const pseudoLegalMoves = getPseudoLegalMoves(boardState, piece, row, col);
        const legalMovesResult = [];
        for (const move of pseudoLegalMoves) {
            const [toRow, toCol] = move;
            const tempBoard = JSON.parse(JSON.stringify(boardState));
            tempBoard[toRow][toCol] = tempBoard[row][col];
            tempBoard[row][col] = null;
            const kingPos = findKing(tempBoard, piece.color);
            if (kingPos && !isSquareAttacked(tempBoard, kingPos.row, kingPos.col, (piece.color === 'white' ? 'black' : 'white'))) {
                legalMovesResult.push(move);
            }
        }
        return legalMovesResult;
    }

    function findKing(board, color) {
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const piece = board[r]?.[c];
                if (piece && piece.type === 'king' && piece.color === color) { return { row: r, col: c }; }
            }
        }
        return null;
    }

    // --- COMPLETELY REWRITTEN AND ROBUST THREAT DETECTION ENGINE ---
    function isSquareAttacked(board, row, col, attackerColor) {
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const piece = board[r]?.[c];
                if (piece && piece.color === attackerColor) {
                    // Get the raw attack moves for the enemy piece
                    const attackMoves = getAttackMoves(board, piece, r, c);
                    // Check if any of those attacks land on the target square
                    if (attackMoves.some(move => move[0] === row && move[1] === col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    // --- PURE LOGIC MOVE GENERATION (NO DOM DEPENDENCY) ---

    function isSquareOnBoard(row, col) {
        const isMainBoard = (row >= 1 && row <= 8) && (col >= 1 && col <= 8);
        const isTopExtra = (row === 0) && (col === 4 || col === 5);
        const isBottomExtra = (row === 9) && (col === 4 || col === 5);
        return isMainBoard || isTopExtra || isBottomExtra;
    }

    function getPseudoLegalMoves(board, piece, row, col) {
        switch (piece.type) {
            case 'pawn': return getPawnMoves(board, piece, row, col);
            default: return getAttackMoves(board, piece, row, col).filter(move => {
                const target = board[move[0]][move[1]];
                return target === null || target.color !== piece.color;
            });
        }
    }
    
    function getAttackMoves(board, piece, row, col) {
        switch (piece.type) {
            case 'pawn':
                const dir = piece.color === 'white' ? -1 : 1;
                const moves = [];
                for (const c of [col - 1, col + 1]) {
                    if (isSquareOnBoard(row + dir, c)) moves.push([row + dir, c]);
                }
                return moves;
            case 'knight': return getKnightMoves(board, row, col);
            case 'rook': return getRookMoves(board, row, col);
            case 'bishop': return getBishopMoves(board, row, col);
            case 'queen': return getQueenMoves(board, row, col);
            case 'king': return getKingMoves(board, row, col);
            case 'giraffe': return getGiraffeMoves(board, row, col);
            default: return [];
        }
    }

    function getPawnMoves(board, piece, row, col) { const moves = getAttackMoves(board, piece, row, col).filter(move => board[move[0]][move[1]] && board[move[0]][move[1]].color !== piece.color); const dir = piece.color === 'white' ? -1 : 1; const oneStep = row + dir; if (board[oneStep]?.[col] === null) { moves.push([oneStep, col]); const startRow = piece.color === 'white' ? 7 : 2; if (row === startRow && board[oneStep + dir]?.[col] === null) { moves.push([oneStep + dir, col]); } } return moves; }
    function getKnightMoves(board, row, col) { const moves = []; const offsets = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]; for (const [dr, dc] of offsets) { const newRow = row + dr; const newCol = col + dc; if (isSquareOnBoard(newRow, newCol)) moves.push([newRow, newCol]); } return moves; }
    function getGiraffeMoves(board, row, col) { const moves = []; const offsets = [[-4, -1], [-4, 1], [4, -1], [4, 1], [-1, -4], [1, -4], [-1, 4], [1, 4]]; for (const [dr, dc] of offsets) { const newRow = row + dr; const newCol = col + dc; if (isSquareOnBoard(newRow, newCol)) moves.push([newRow, newCol]); } return moves; }
    function getKingMoves(board, row, col) { const moves = []; const offsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; for (const [dr, dc] of offsets) { const newRow = row + dr; const newCol = col + dc; if (isSquareOnBoard(newRow, newCol)) moves.push([newRow, newCol]); } return moves; }
    function getSlidingMoves(board, row, col, directions) { const moves = []; for (const [dr, dc] of directions) { let newRow = row + dr; let newCol = col + dc; while (isSquareOnBoard(newRow, newCol)) { moves.push([newRow, newCol]); if (board[newRow][newCol] !== null) break; newRow += dr; newCol += dc; } } return moves; }
    function getRookMoves(board, row, col) { return getSlidingMoves(board, row, col, [[-1, 0], [1, 0], [0, -1], [0, 1]]); }
    function getBishopMoves(board, row, col) { return getSlidingMoves(board, row, col, [[-1, -1], [-1, 1], [1, -1], [1, 1]]); }
    function getQueenMoves(board, row, col) { return [...getRookMoves(board, row, col), ...getBishopMoves(board, row, col)]; }
    
    function createBoardUI() {
        chessboard.innerHTML = '';
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (isSquareOnBoard(row, col)) {
                    const square = document.createElement('div');
                    square.classList.add('square');
                    const isLight = (row + col) % 2 !== 0;
                    square.classList.add(isLight ? 'light' : 'dark');
                    square.style.gridRowStart = row + 1;
                    square.style.gridColumnStart = col + 1;
                    square.dataset.row = row;
                    square.dataset.col = col;
                    square.addEventListener('click', handleSquareClick);
                    chessboard.appendChild(square);
                }
            }
        }
    }

    function renderPieces() {
        document.querySelectorAll('.piece').forEach(p => p.remove());
        document.querySelectorAll('.square.in-check').forEach(s => s.classList.remove('in-check'));
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const piece = boardState[row][col];
                if (piece) {
                    const square = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                    if (square) {
                        const pieceDiv = document.createElement('div');
                        pieceDiv.classList.add('piece');
                        pieceDiv.style.color = piece.color;
                        if (piece.type === 'giraffe' && piece.color === 'black') {
                           pieceDiv.style.webkitTextStroke = '1px white';
                           pieceDiv.style.textStroke = '1px white';
                        }
                        pieceDiv.innerHTML = pieceSymbols[piece.color][piece.type];
                        square.appendChild(pieceDiv);
                    }
                }
            }
        }
        if (isCheck && !gameOver) {
            const kingPos = findKing(boardState, currentPlayer);
            if (kingPos) {
                const kingSquare = document.querySelector(`[data-row='${kingPos.row}'][data-col='${kingPos.col}']`);
                if (kingSquare) kingSquare.classList.add('in-check');
            }
        }
    }

    initializeGame();
});
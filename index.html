document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const statusDisplay = document.getElementById('status-display');
    const newGameButton = document.getElementById('new-game-button');
    const promotionModal = document.getElementById('promotion-modal');
    const promotionChoices = document.getElementById('promotion-choices');
    
    const sounds = {
        move: new Audio('sounds/move.mp3'),
        capture: new Audio('sounds/capture.mp3'),
        check: new Audio('sounds/check.mp3'),
        gameEnd: new Audio('sounds/game-end.mp3')
    };

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
    white: {
        king: 'images/wK.svg', queen: 'images/wQ.svg', rook: 'images/wR.svg',
        bishop: 'images/wB.svg', knight: 'images/wN.svg', pawn: 'images/wP.svg',
        giraffe: 'images/wG.svg'
    },
    black: {
        king: 'images/bK.svg', queen: 'images/bQ.svg', rook: 'images/bR.svg',
        bishop: 'images/bB.svg', knight: 'images/bN.svg', pawn: 'images/bP.svg',
        giraffe: 'images/bG.svg'
    }
};

function initializeGame() {
        boardState = JSON.parse(JSON.stringify(initialBoardState));
        currentPlayer = 'white';
        selectedSquare = null;
        legalMoves = [];
        isCheck = false;
        gameOver = false;
        newGameButton.style.display = 'none';
        promotionModal.style.display = 'none'; 
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
        const isCapture = boardState[to.row][to.col] !== null;
        const piece = boardState[from.row][from.col];
        boardState[to.row][to.col] = piece;
        boardState[from.row][from.col] = null;

        clearSelection();

        if (isCapture) {
            sounds.capture.play();
        } else {
            sounds.move.play();
        }

        renderPieces();

        const isWhitePawnPromotion = piece.type === 'pawn' && piece.color === 'white' && to.row === 8;
        const isBlackPawnPromotion = piece.type === 'pawn' && piece.color === 'black' && to.row === 1;

        if (isWhitePawnPromotion || isBlackPawnPromotion) {
            promptForPromotion(to, piece.color);
        } else {
            switchPlayerAndContinue();
        }
    }

    function promptForPromotion(position, color, moveWasCapture) {
        promotionChoices.innerHTML = '';
        const pieces = ['queen', 'rook', 'bishop', 'knight'];
        pieces.forEach(pieceType => {
            const choiceImg = document.createElement('img');
            choiceImg.src = pieceSymbols[color][pieceType];
            choiceImg.classList.add('promotion-choice');
            if (color === 'black') {
                choiceImg.classList.add('rotated');
            }
            choiceImg.addEventListener('click', () => {
                handlePromotionChoice(position, pieceType, color, moveWasCapture);
            }, { once: true });
            promotionChoices.appendChild(choiceImg);
        });
        promotionModal.style.display = 'flex';
    }
    

    function handlePromotionChoice(position, pieceType, color) {
        boardState[position.row][position.col] = { type: pieceType, color: color };
        promotionModal.style.display = 'none';
        
        sounds.capture.play(); 
        
        renderPieces();
        
        switchPlayerAndContinue();
    }

    function updateGameState(isCapture, isPromotion = false) {
        if (!isPromotion) { 
            if (isCapture) {
                sounds.capture.play();
            } else {
                sounds.move.play();
            }
        }

        currentPlayer = (currentPlayer === 'white' ? 'black' : 'white');

        const kingPos = findKing(boardState, currentPlayer);
        isCheck = kingPos ? isSquareAttacked(boardState, kingPos.row, kingPos.col, (currentPlayer === 'white' ? 'black' : 'white')) : false;

        renderPieces();

        updateStatus();

        if (isCheck) {
            sounds.check.play();
        }

        checkGameState();
    }
    function switchPlayerAndContinue() {
        currentPlayer = (currentPlayer === 'white' ? 'black' : 'white');

        const kingPos = findKing(boardState, currentPlayer);
        isCheck = kingPos ? isSquareAttacked(boardState, kingPos.row, kingPos.col, (currentPlayer === 'white' ? 'black' : 'white')) : false;

        updateStatus();
        if (isCheck) {
            sounds.check.play();
        }

        renderPieces();

        checkGameState();
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
                if(!isSquareOnBoard(r,c)) continue;
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
        }
    }

    function endGame(message) {
        sounds.gameEnd.play();
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

    function isSquareAttacked(board, row, col, attackerColor) {
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const piece = board[r]?.[c];
                if (piece && piece.color === attackerColor) {
                    const attackMoves = getAttackMoves(board, piece, r, c);
                    if (attackMoves.some(move => move[0] === row && move[1] === col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function getPseudoLegalMoves(board, piece, row, col) {
        if (piece.type === 'pawn') {
            return getPawnMoves(board, piece, row, col);
        }
        return getAttackMoves(board, piece, row, col).filter(move => {
            const target = board[move[0]][move[1]];
            return target === null || target.color !== piece.color;
        });
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
            default:
                return generateMoves(board, row, col, piece.type);
        }
    }

    function getPawnMoves(board, piece, row, col) { const moves = getAttackMoves(board, piece, row, col).filter(move => board[move[0]][move[1]] && board[move[0]][move[1]].color !== piece.color); const dir = piece.color === 'white' ? -1 : 1; const oneStep = row + dir; if (isSquareOnBoard(oneStep, col) && board[oneStep][col] === null) { moves.push([oneStep, col]); const startRow = piece.color === 'white' ? 7 : 2; const twoStep = oneStep + dir; if (row === startRow && isSquareOnBoard(twoStep, col) && board[twoStep][col] === null) { moves.push([twoStep, col]); } } return moves; }
    
    function generateMoves(board, row, col, pieceType) {
        const moves = [];
        const offsets = {
            knight: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]],
            giraffe: [[-3, -1], [-3, 1], [3, -1], [3, 1], [-1, -3], [1, -3], [-1, 3], [1, 3]],
            king: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        };
        const directions = {
            rook: [[-1, 0], [1, 0], [0, -1], [0, 1]],
            bishop: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
            queen: [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
        };

        if (offsets[pieceType]) {
            for (const [dr, dc] of offsets[pieceType]) {
                const newRow = row + dr; const newCol = col + dc;
                if (isSquareOnBoard(newRow, newCol)) moves.push([newRow, newCol]);
            }
        } else if (directions[pieceType]) {
            for (const [dr, dc] of directions[pieceType]) {
                let newRow = row + dr; let newCol = col + dc;
                while (isSquareOnBoard(newRow, newCol)) {
                    moves.push([newRow, newCol]);
                    if (board[newRow][newCol] !== null) break;
                    newRow += dr; newCol += dc;
                }
            }
        }
        return moves;
    }
    
    function isSquareOnBoard(row, col) {
        const isMainBoard = (row >= 1 && row <= 8) && (col >= 1 && col <= 8);
        const isTopExtra = (row === 0) && (col === 4 || col === 5);
        const isBottomExtra = (row === 9) && (col === 4 || col === 5);
        return isMainBoard || isTopExtra || isBottomExtra;
    }
    
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
        document.querySelectorAll('.piece-img').forEach(p => p.remove()); // Clear old images
        document.querySelectorAll('.square.in-check').forEach(s => s.classList.remove('in-check'));

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const piece = boardState[row][col];
                if (piece) {
                    const square = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                    if (square) {
                        const pieceImg = document.createElement('img');
                        pieceImg.src = pieceSymbols[piece.color][piece.type];
                        pieceImg.classList.add('piece-img', 'piece');
                    
                        if (piece.type === 'king') {
                            pieceImg.dataset.kingColor = piece.color;
                        }
                    
                    // Rotate the black pieces to face down
                        if (piece.color === 'black') {
                            pieceImg.classList.add('rotated');
                        }
                    
                        square.appendChild(pieceImg);
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

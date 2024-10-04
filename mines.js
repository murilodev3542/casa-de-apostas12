let balance;

// Função para atualizar o saldo
function updateBalance(amount) {
    balance += amount;
    localStorage.setItem('balance', balance.toFixed(2)); // Armazena o saldo no Local Storage
    updateBalanceDisplay(); // Atualiza o display do saldo
}

// Atualiza o display do saldo
function updateBalanceDisplay() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    balanceDisplay.textContent = `Saldo: R$${balance.toFixed(2)}`;
}

// Quando a página é carregada, busque o saldo
window.onload = function() {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
        balance = parseFloat(savedBalance);
    } else {
        balance = 0; // Define o saldo como 0 se não houver saldo salvo
    }
    updateBalanceDisplay(); // Atualiza o display ao carregar a página
};

const gridSize = 5; // Tamanho da grade (5x5)
let mineCount = 5; // Quantidade inicial de minas
let grid = [];
let gameOver = false;
let score = 0;
let multiplier = 1;

// Inicializa o jogo
function initGame() {
    mineCount = parseInt(document.getElementById('mineCountSelect').value); // Captura o número de minas selecionado
    grid = generateGrid(gridSize);
    placeMines(grid, mineCount);
    gameOver = false;
    score = 0;
    multiplier = calculateInitialMultiplier(mineCount); // Define o multiplicador inicial com base no número de minas
    updateMultiplierDisplay(); // Atualiza o multiplicador na tela
    updateBalanceDisplay(); // Atualiza o saldo na tela
    renderGrid();
    document.getElementById("cashoutButton").style.display = "none"; // Esconde o botão "Retirar Dinheiro"
    document.getElementById("restartButton").style.display = "none"; // Esconde o botão "Jogar Novamente"
}

// Função para calcular o multiplicador inicial com base no número de minas
function calculateInitialMultiplier(mineCount) {
    if (mineCount <= 3) {
        return 1.0; // Multiplicador base
    } else if (mineCount <= 5) {
        return 1.5;
    } else if (mineCount <= 10) {
        return 2.0;
    } else if (mineCount <= 15) {
        return 2.5;
    } else {
        return 3.0; // Para um número de minas muito alto
    }
}

// Atualiza o display do multiplicador
function updateMultiplierDisplay() {
    const multiplierDisplay = document.getElementById('multiplierDisplay');
    multiplierDisplay.textContent = `Multiplicador: x${multiplier.toFixed(1)}`;
}

// Gerar a grade
function generateGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = { hasMine: false, revealed: false };
        }
    }
    return grid;
}

// Colocar minas aleatoriamente
function placeMines(grid, count) {
    let placedMines = 0;
    while (placedMines < count) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (!grid[row][col].hasMine) {
            grid[row][col].hasMine = true;
            placedMines++;
        }
    }
}

// Função para revelar bloco
function revealBlock(row, col) {
    if (gameOver || grid[row][col].revealed) return;

    grid[row][col].revealed = true;

    if (grid[row][col].hasMine) {
        gameOver = true;
        revealAllMines();
        loseBet(); // O jogador perde a aposta
        document.getElementById("cashoutButton").style.display = "block"; // Mostra o botão "Retirar Dinheiro"
        document.getElementById("restartButton").style.display = "block"; // Mostra o botão "Jogar Novamente"
    } else {
        score++;
        multiplier += 0.1; // Incremento do multiplicador a cada bloco revelado
        updateMultiplierDisplay(); // Atualiza o multiplicador a cada bloco revelado
        renderGrid(); // Atualiza a grade
        // Mostrar o botão "Retirar Dinheiro" somente se o jogo não tiver acabado
        if (!gameOver) {
            document.getElementById("cashoutButton").style.display = "block";
        }
    }
}

// Função para revelar todos os blocos
function revealAllBlocks() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            grid[i][j].revealed = true;
        }
    }
    renderGrid();
}

// Função para revelar todas as minas
function revealAllMines() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j].hasMine) {
                grid[i][j].revealed = true;
            }
        }
    }
    renderGrid();
}

// Função para perder a aposta
function loseBet() {
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    updateBalance(-betAmount); // Atualiza o saldo ao perder a aposta
}

// Função para ganhar a aposta
function winBet() {
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    const winnings = betAmount * multiplier;
    updateBalance(winnings); // Atualiza o saldo ao ganhar a aposta
}

// Atualizar o grid na tela
function renderGrid() {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < gridSize; j++) {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';
            if (grid[i][j].revealed) {
                if (grid[i][j].hasMine) {
                    blockDiv.classList.add('mine');
                } else {
                    blockDiv.classList.add('diamond');
                }
            }
            blockDiv.onclick = () => revealBlock(i, j);
            rowDiv.appendChild(blockDiv);
        }
        gameDiv.appendChild(rowDiv);
    }
}

// Função para reiniciar o jogo
function restartGame() {
    initGame(); // Reinicializa o jogo
    document.getElementById("cashoutButton").style.display = "none"; // Esconde o botão "Retirar Dinheiro"
    document.getElementById("restartButton").style.display = "none"; // Esconde o botão "Jogar Novamente"
}

// Inicializa o jogo ao carregar a página
document.getElementById('startGameButton').onclick = initGame;

// Adiciona a funcionalidade ao botão "Retirar Dinheiro"
document.getElementById("cashoutButton").onclick = function() {
    revealAllBlocks(); // Revela todos os blocos
    winBet(); // O jogador ganha a aposta
    document.getElementById("cashoutButton").style.display = "none"; // Esconde o botão após o uso
    document.getElementById("restartButton").style.display = "block"; // Mostra o botão "Jogar Novamente"
};

// Adiciona a funcionalidade ao botão "Jogar Novamente"
document.getElementById("restartButton").onclick = restartGame;

// Adiciona a funcionalidade ao botão "Voltar para Página Inicial"
document.getElementById("back-button").onclick = function() {
    window.location.href = 'dashboard.html'; // Navega para a página inicial
};

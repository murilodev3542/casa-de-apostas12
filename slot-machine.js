let balance;

// Função para atualizar o saldo e refletir nas interfaces
function updateBalanceDisplay() {
    document.getElementById('balance').textContent = balance.toFixed(2); // Atualiza o saldo exibido
    localStorage.setItem('balance', balance.toFixed(2)); // Armazena o saldo no Local Storage
}

// Quando carregar a página, busque o saldo salvo no Local Storage
window.onload = function() {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
        balance = parseFloat(savedBalance);
    } else {
        balance = 100.00; // Define um saldo inicial, caso não exista no Local Storage
    }
    updateBalanceDisplay(); // Atualiza o display com o saldo atual
};

// Array de símbolos do slot machine
const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇'];

// Função para lidar com o giro da slot machine
document.getElementById('spin').addEventListener('click', () => {
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');
    const betSelect = document.getElementById('bet');
    const bankDisplay = document.getElementById('balance');

    const bet = parseInt(betSelect.value);

    // Verifica se o usuário tem saldo suficiente para a aposta
    if (balance < bet) {
        alert('Você não tem créditos suficientes para essa aposta.');
        return;
    }

    // Atualiza o saldo subtraindo o valor da aposta
    balance -= bet;
    updateBalanceDisplay(); // Atualiza o display do saldo

    // Gira os rolos
    reel1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    reel2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    reel3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Lógica para determinar se o jogador ganhou (exemplo simples)
    if (reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent) {
        const winnings = bet * 10; // Valor ganho (multiplicador de 10)
        balance += winnings;
        updateBalanceDisplay(); // Atualiza o saldo com os ganhos
        alert(`Você ganhou ${winnings} créditos!`);
    }
});

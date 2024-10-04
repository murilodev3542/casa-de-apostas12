let balance;
function updateBalance(amount) {
    balance += amount;
    localStorage.setItem('balance', balance.toFixed(2)); // Armazena o saldo no Local Storage
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Quando você carregar a página, busque o saldo
window.onload = function() {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
        balance = parseFloat(savedBalance);
        document.getElementById('balance').textContent = balance.toFixed(2);
    }
};
window.onload = function() {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
        balance = parseFloat(savedBalance);
        document.getElementById('balance').textContent = balance.toFixed(2);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const gameCrash = document.getElementById('gameCrash');
    const gameJack = document.getElementById('gameJack');
    const gameMaquina = document.getElementById('gameMaquina');
    const gameRoleta = document.getElementById('gameRoleta');
    const gameMines = document.getElementById('gameMines');
    const userBalance = document.getElementById('userBalance');
    const profileButton = document.getElementById('profileBtn')

    // Atualize o saldo do usuário, se necessário
    // userBalance.textContent = obterSaldoDoUsuario();
    
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'Cashonfire.html'; // Redirecione para a página de login
    });
    gameMines.addEventListener('click', () => {
        window.location.href = 'mines.html'; // Substitua pela URL real do jogo Crash
    });
    gameMaquina.addEventListener('click', () => {
        window.location.href = 'slot-machine.html'; // Substitua pela URL real do jogo Double
    });
    gameJack.addEventListener('click', () => {
        window.location.href = 'jack.html'; // Substitua pela URL real do jogo Maquina Casanique
    });
    gameCrash.addEventListener('click', () => {
        window.location.href = 'crash.html';
    });
    gameRoleta.addEventListener('click', () => {
        window.location.href = 'roleta.html';
    });
    profileButton.addEventListener('click', () => {
        window.location.href = 'perfil.php';
    });
});

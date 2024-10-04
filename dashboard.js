let balance; // Inicialize o saldo como zero

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
    } else {
        balance = 0; // Inicia o saldo como 0 se não houver saldo salvo
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const gameCrash = document.getElementById('gameCrash');
    const gameJack = document.getElementById('gameJack');
    const gameMaquina = document.getElementById('gameMaquina');
    const gameRoleta = document.getElementById('gameRoleta');
    const gameMines = document.getElementById('gameMines');
    const profileButton = document.getElementById('profileBtn');

    // Redireciona para a página index.php ao clicar no botão de logout
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'index.php'; // Redireciona para a página de login
    });
    
    // Adiciona os eventos de clique para redirecionar para as páginas dos jogos
    gameMines.addEventListener('click', () => {
        window.location.href = 'mines.html';
    });
    gameMaquina.addEventListener('click', () => {
        window.location.href = 'slot-machine.html';
    });
    gameJack.addEventListener('click', () => {
        window.location.href = 'jack.html';
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

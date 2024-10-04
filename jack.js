let balance = 1000;

// Função para atualizar o saldo
function updateBalance(amount) {
    balance += amount;
    localStorage.setItem('balance', balance.toFixed(2)); // Armazena o saldo no Local Storage
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Quando a página é carregada, busque o saldo
window.onload = function() {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance) {
        balance = parseFloat(savedBalance);
    }
    document.getElementById('balance').textContent = balance.toFixed(2);
};

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const deck = [];

// Mapeia os emojis das cartas
const suitSymbols = {
    hearts: '❤️',
    diamonds: '♦️',
    clubs: '♣️',
    spades: '♠️'
};

const valueSymbols = {
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    'J': 'J',
    'Q': 'Q',
    'K': 'K',
    'A': 'A'
};

let bet = 0;
let playerHand = [];
let dealerHand = [];
let playerBusted = false;
let dealerBusted = false;
let playerStand = false;
let dealerStand = false;

// Cria um baralho
function createDeck() {
    deck.length = 0; // Limpa o baralho
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
}

// Embaralha o baralho
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Cria uma nova mão de cartas
function createHand() {
    return [deck.pop(), deck.pop()];
}

// Obtém o valor da carta
function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
}

// Atualiza a pontuação das cartas
function getHandScore(hand) {
    let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aceCount = hand.filter(card => card.value === 'A').length;

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

// Atualiza a interface com as cartas e pontuação
function updateDisplay() {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerScoreP = document.getElementById('player-score');
    const dealerScoreP = document.getElementById('dealer-score');
    const statusP = document.getElementById('status');

    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';

    playerHand.forEach(card => {
        const span = document.createElement('span');
        span.textContent = `${valueSymbols[card.value]} ${suitSymbols[card.suit]}`;
        playerCardsDiv.appendChild(span);
    });

    dealerHand.forEach(card => {
        const span = document.createElement('span');
        span.textContent = `${valueSymbols[card.value]} ${suitSymbols[card.suit]}`;
        dealerCardsDiv.appendChild(span);
    });

    playerScoreP.textContent = `Pontuação: ${getHandScore(playerHand)}`;
    dealerScoreP.textContent = `Pontuação: ${getHandScore(dealerHand)}`;

    if (playerBusted) {
        statusP.textContent = 'Você estourou! Dealer ganhou.';
        updateBalance(-bet); // Atualiza o saldo
        endGame();
    } else if (dealerBusted) {
        statusP.textContent = 'Dealer estourou! Você ganhou!';
        updateBalance(bet); // Atualiza o saldo
        endGame();
    } else if (playerStand && dealerStand) {
        if (getHandScore(playerHand) > getHandScore(dealerHand)) {
            statusP.textContent = 'Você ganhou!';
            updateBalance(bet); // Atualiza o saldo
        } else if (getHandScore(playerHand) < getHandScore(dealerHand)) {
            statusP.textContent = 'Dealer ganhou!';
            updateBalance(-bet); // Atualiza o saldo
        } else {
            statusP.textContent = 'Empate!';
        }
        endGame();
    }
}

// Finaliza o jogo
function endGame() {
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

// Inicializa o jogo
function startGame() {
    const betAmountInput = document.getElementById('bet-amount');
    const betAmount = parseInt(betAmountInput.value, 10);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert('Aposta inválida. Insira um valor válido.');
        return;
    }

    bet = betAmount;
    createDeck();
    shuffleDeck();

    playerHand = createHand();
    dealerHand = createHand();
    playerBusted = false;
    dealerBusted = false;
    playerStand = false;
    dealerStand = false;

    updateDisplay();

    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
}

// Função para "Comprar" uma carta
function hit() {
    playerHand.push(deck.pop());

    if (getHandScore(playerHand) > 21) {
        playerBusted = true;
    }

    updateDisplay();
}

// Função para "Parar" o jogo
function stand() {
    playerStand = true;

    while (getHandScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    if (getHandScore(dealerHand) > 21) {
        dealerBusted = true;
    }

    dealerStand = true;
    updateDisplay();
}

// Adiciona os ouvintes de eventos
document.getElementById('deal-button').addEventListener('click', startGame);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

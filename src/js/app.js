'use strict' 

const { log } = console;
function select(selector, scope = document) {
	return scope.querySelector(selector);
}

function listen(event, element, callback) {
	return element.addEventListener(event, callback);
}

/*-------------------------------------------------------------->
	Initial Declarations 
<--------------------------------------------------------------*/

const dealerDisplay = select('.dealer-value-display');
const dealerValueDisplay = select('.value-display')

const finalResultDisplay = select('h2');
const playerDisplay = select('.player-display');
const playerValueDisplay = select('.player-value-display')
const startButton = select('.start-btn');
const hitButton = select('.hit-btn');
const holdButton = select('.hold-btn');
const restartButton = select('.restart-btn');

const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const ranks = [
		'Ace', '2', '3', '4', '5', 
		'6', '7', '8', '9', '10', 
		'Jack', 'Queen', 'King'
	];

/*-------------------------------------------------------------->
  Hand Declarations 
<--------------------------------------------------------------*/

const player = {
	hand: [],
	handValue: 0,
	aceCount: 0,
	handDisplay: []
};

const dealer = {
	hand: [],
	handValue: 0,
	aceCount: 0,
	handDisplay: []
};

/*-------------------------------------------------------------->
	Deck Shuffle
<--------------------------------------------------------------*/

function shuffle() {
	const deck = [...new Array(52).keys()];
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

const shuffledDeck = shuffle();

function getCardValue(rank) {
	let cardValue = 0;
	if (rank === 'Ace') {
		cardValue = 11;
	} else if (['Jack', 'Queen', 'King'].includes(rank)) {
		cardValue = 10;
	} else {
		cardValue = parseInt(rank);
	}
	return cardValue;
}

function dealOne(handObj) {
	const { hand, handDisplay } = handObj;
	const dealtCard = shuffledDeck.splice(0, 1)[0];
	hand.push(dealtCard);
	const suit = suits[Math.trunc((dealtCard - 1) / 13)];
	const rank = ranks[(dealtCard - 1) % 13];
	const cardValue = getCardValue(rank);

	handObj.handValue += cardValue;
	handObj.handDisplay.push(`${rank} of ${suit}`);

	if (rank === 'Ace') {
		handObj.aceCount++;
	}

	return shuffledDeck;
}

function aceAdjust(handObj) {
	while (handObj.handValue > 21 && handObj.aceCount > 0) {
		handObj.handValue -= 10;
		handObj.aceCount--;
	}
}

function bustCheck(handObj) {
	if (handObj.handValue > 21) {
		aceAdjust(handObj);

		if (handObj.handValue > 21) {
			if (handObj === player) {
				finalResultDisplay.textContent = 'YOU LOSE!';
			} else if (handObj === dealer) {
				finalResultDisplay.textContent = 'YOU WIN!';
			}
		}

		hitButton.classList.remove('visible');
		holdButton.classList.remove('visible');
	}
}

function updateDisplay() {
	playerDisplay.textContent = player.handDisplay.join(', ');
	playerValueDisplay.textContent = `Player Hand Total: ${player.handValue}`;
	dealerDisplay.textContent = dealer.handDisplay[0];
}

function startingDeal() {
	for (let i = 0; i < 2; i++) {
		dealOne(player);
		dealOne(dealer);
	}
	aceAdjust(dealer);
	aceAdjust(player);
	updateDisplay();
	startButton.classList.add('hidden');
	hitButton.classList.add('visible');
	holdButton.classList.add('visible');
}

function hit(handObj) {
	dealOne(handObj);
	aceAdjust(handObj);
	bustCheck(handObj);
	updateDisplay();
}

function finalResult() {
  if (dealer.handValue > player.handValue) {
    finalResultDisplay.textContent = 'DEALER WINS!';
  } else if (dealer.handValue < player.handValue) {
    finalResultDisplay.textContent = 'YOU WIN!';
  } else {
    finalResultDisplay.textContent = 'TIE GAME';
  }
	hitButton.classList.remove('visible');
	holdButton.classList.remove('visible');

}


function dealerTurn() {
  while (dealer.handValue < 17) {
    hit(dealer);  
  }
  updateDisplay(); 
	finalResult();
}

function resetGame() {
	player.hand = [];
	player.handValue = 0;
	player.aceCount = 0;
	player.handDisplay = [];

	dealer.hand = [];
	dealer.handValue = 0;
	dealer.aceCount = 0;
	dealer.handDisplay = [];

	shuffledDeck.length = 0; 
	shuffledDeck.push(...shuffle()); 

	finalResultDisplay.textContent = '';
	playerDisplay.textContent = '';
	playerValueDisplay.textContent = '';
	dealerDisplay.textContent = '';

	startButton.classList.remove('hidden');
	hitButton.classList.remove('visible');
	holdButton.classList.remove('visible');
	restartButton.classList.add('hidden');
}

listen('click', startButton, () => { 
	startingDeal();
}); 

listen('click', hitButton, () => {
	hit(player);
	bustCheck(player);
	console.log(dealer.handValue, dealer.handDisplay);
});

listen('click', holdButton, () => {
	dealerTurn();
	console.log(dealer.handValue, dealer.handDisplay);
});

listen('click', restartButton, () => {
	resetGame();
});


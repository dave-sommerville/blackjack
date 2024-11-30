'use strict';


/*
- Switch to modules
- Show all dealer cards at end
- Adjust ending animations / timeout 
- Double payout adjustment 
*/

const { log } = console;

function select(selector, scope = document) {
	return scope.querySelector(selector);
}

function listen(event, element, callback) {
	return element.addEventListener(event, callback);
}

function isImageFile(file) {
  return file && file.type.startsWith('image');
}

function createImage(imageSrc) {
  const img = document.createElement('img');
  img.src = imageSrc;  
  img.alt = imageSrc; // Because the photo could be anything 
  return img;
}

/*-------------------------------------------------------------->
	Initial Declarations 
<--------------------------------------------------------------*/

const dealerDisplay = select('.dealer-display');
const dealerValueDisplay = select('.dealer-value-display');
const dealerImgDisplay = select('.dealer-image-wrapper');
const finalResultDisplay = select('.final-result-display');
const playerDisplay = select('.player-display');
const playerValueDisplay = select('.player-value-display');
const playerImgDisplay = select('.player-image-wrapper');
const dealBetButton = select('.deal-bet');
const actionButtons = select('.actions-btns');
const startButton = select('.start-btn');
const hitButton = select('.hit-btn');
const holdButton = select('.hold-btn');
const doubleButton = select('.double-btn');
const arrowButtons = select('.button')
const increaseBet = select('.up');
const decreaseBet = select('.down');

const bankDisplay = select('.player-bank');
const totalPlayerBet = select('.pot');

/*-------------------------------------------------------------->
  Card Declarations 
<--------------------------------------------------------------*/

const cardObjects = [
  { carddisplay: 'Ace of Hearts', cardvalue: 11, imgsrc: './src/img/hearts_ace.svg' },
  { carddisplay: '2 of Hearts', cardvalue: 2, imgsrc: './src/img/hearts_2.svg' },
  { carddisplay: '3 of Hearts', cardvalue: 3, imgsrc: './src/img/hearts_3.svg' },
  { carddisplay: '4 of Hearts', cardvalue: 4, imgsrc: './src/img/hearts_4.svg' },
  { carddisplay: '5 of Hearts', cardvalue: 5, imgsrc: './src/img/hearts_5.svg' },
  { carddisplay: '6 of Hearts', cardvalue: 6, imgsrc: './src/img/hearts_6.svg' },
  { carddisplay: '7 of Hearts', cardvalue: 7, imgsrc: './src/img/hearts_7.svg' },
  { carddisplay: '8 of Hearts', cardvalue: 8, imgsrc: './src/img/hearts_8.svg' },
  { carddisplay: '9 of Hearts', cardvalue: 9, imgsrc: './src/img/hearts_9.svg' },
  { carddisplay: '10 of Hearts', cardvalue: 10, imgsrc: './src/img/hearts_10.svg' },
  { carddisplay: 'Jack of Hearts', cardvalue: 10, imgsrc: './src/img/hearts_jack.svg' },
  { carddisplay: 'Queen of Hearts', cardvalue: 10, imgsrc: './src/img/hearts_queen.svg' },
  { carddisplay: 'King of Hearts', cardvalue: 10, imgsrc: './src/img/hearts_king.svg' },

  { carddisplay: 'Ace of Diamonds', cardvalue: 11, imgsrc: './src/img/diamonds_ace.svg' },
  { carddisplay: '2 of Diamonds', cardvalue: 2, imgsrc: './src/img/diamonds_2.svg' },
  { carddisplay: '3 of Diamonds', cardvalue: 3, imgsrc: './src/img/diamonds_3.svg' },
  { carddisplay: '4 of Diamonds', cardvalue: 4, imgsrc: './src/img/diamonds_4.svg' },
  { carddisplay: '5 of Diamonds', cardvalue: 5, imgsrc: './src/img/diamonds_5.svg' },
  { carddisplay: '6 of Diamonds', cardvalue: 6, imgsrc: './src/img/diamonds_6.svg' },
  { carddisplay: '7 of Diamonds', cardvalue: 7, imgsrc: './src/img/diamonds_7.svg' },
  { carddisplay: '8 of Diamonds', cardvalue: 8, imgsrc: './src/img/diamonds_8.svg' },
  { carddisplay: '9 of Diamonds', cardvalue: 9, imgsrc: './src/img/diamonds_9.svg' },
  { carddisplay: '10 of Diamonds', cardvalue: 10, imgsrc: './src/img/diamonds_10.svg' },
  { carddisplay: 'Jack of Diamonds', cardvalue: 10, imgsrc: './src/img/diamonds_jack.svg' },
  { carddisplay: 'Queen of Diamonds', cardvalue: 10, imgsrc: './src/img/diamonds_queen.svg' },
  { carddisplay: 'King of Diamonds', cardvalue: 10, imgsrc: './src/img/diamonds_king.svg' },

  { carddisplay: 'Ace of Clubs', cardvalue: 11, imgsrc: './src/img/clubs_ace.svg' },
  { carddisplay: '2 of Clubs', cardvalue: 2, imgsrc: './src/img/clubs_2.svg' },
  { carddisplay: '3 of Clubs', cardvalue: 3, imgsrc: './src/img/clubs_3.svg' },
  { carddisplay: '4 of Clubs', cardvalue: 4, imgsrc: './src/img/clubs_4.svg' },
  { carddisplay: '5 of Clubs', cardvalue: 5, imgsrc: './src/img/clubs_5.svg' },
  { carddisplay: '6 of Clubs', cardvalue: 6, imgsrc: './src/img/clubs_6.svg' },
  { carddisplay: '7 of Clubs', cardvalue: 7, imgsrc: './src/img/clubs_7.svg' },
  { carddisplay: '8 of Clubs', cardvalue: 8, imgsrc: './src/img/clubs_8.svg' },
  { carddisplay: '9 of Clubs', cardvalue: 9, imgsrc: './src/img/clubs_9.svg' },
  { carddisplay: '10 of Clubs', cardvalue: 10, imgsrc: './src/img/clubs_10.svg' },
  { carddisplay: 'Jack of Clubs', cardvalue: 10, imgsrc: './src/img/clubs_jack.svg' },
  { carddisplay: 'Queen of Clubs', cardvalue: 10, imgsrc: './src/img/clubs_queen.svg' },
  { carddisplay: 'King of Clubs', cardvalue: 10, imgsrc: './src/img/clubs_king.svg' },

  { carddisplay: 'Ace of Spades', cardvalue: 11, imgsrc: './src/img/spades_ace.svg' },
  { carddisplay: '2 of Spades', cardvalue: 2, imgsrc: './src/img/spades_2.svg' },
  { carddisplay: '3 of Spades', cardvalue: 3, imgsrc: './src/img/spades_3.svg' },
  { carddisplay: '4 of Spades', cardvalue: 4, imgsrc: './src/img/spades_4.svg' },
  { carddisplay: '5 of Spades', cardvalue: 5, imgsrc: './src/img/spades_5.svg' },
  { carddisplay: '6 of Spades', cardvalue: 6, imgsrc: './src/img/spades_6.svg' },
  { carddisplay: '7 of Spades', cardvalue: 7, imgsrc: './src/img/spades_7.svg' },
  { carddisplay: '8 of Spades', cardvalue: 8, imgsrc: './src/img/spades_8.svg' },
  { carddisplay: '9 of Spades', cardvalue: 9, imgsrc: './src/img/spades_9.svg' },
  { carddisplay: '10 of Spades', cardvalue: 10, imgsrc: './src/img/spades_10.svg' },
  { carddisplay: 'Jack of Spades', cardvalue: 10, imgsrc: './src/img/spades_jack.svg' },
  { carddisplay: 'Queen of Spades', cardvalue: 10, imgsrc: './src/img/spades_queen.svg' },
  { carddisplay: 'King of Spades', cardvalue: 10, imgsrc: './src/img/spades_king.svg' }
];


/*-------------------------------------------------------------->
	Player Class
<--------------------------------------------------------------*/

class Player {
	#hand = []; 
	#handDisplayText = []; 
	#handDisplayImg = [];  
	#handValue = 0; 
	#aceCount = 0;

	constructor(
		hand = [], 
		handDisplayText = [], 
		handDisplayImg = [], 
		handValue = 0, 
		aceCount = 0
	) {
		this.#hand = hand;
		this.#handDisplayText = handDisplayText || [];
		this.#handDisplayImg = handDisplayImg || [];
		this.#handValue = handValue;
		this.#aceCount = aceCount;

		this.updateHandValue(); 
	}

	set hand(hand) {
		this.#hand = hand;
		this.updateHandValue();
	}
	set handDisplayText(handDisplayText) {
		this.#handDisplayText = handDisplayText;
	}
	set handDisplayImg(handDisplayImg) {
		this.#handDisplayImg = handDisplayImg;
	}
	set handValue(handValue) {
		this.#handValue = handValue;
	}
	set aceCount(aceCount) {
		this.#aceCount = aceCount;
	}

	get hand() {
		return this.#hand;
	}
	get handDisplayText() {
		return this.#handDisplayText;
	}
	get handDisplayImg() {
		return this.#handDisplayImg;
	}
	get handValue() {
		return this.#handValue;
	}
	get aceCount() {
		return this.#aceCount;
	}

	addCard(card, shuffledDeck) {
		if (!Array.isArray(this.#handDisplayText)) {
			this.#handDisplayText = [];
		}
		if (!Array.isArray(this.#handDisplayImg)) {
			this.#handDisplayImg = [];
		}
/*			--  */
		this.#hand.push(card); 
		this.#handDisplayText.push(card.carddisplay);  
		this.#handDisplayImg.push(card.imgsrc); 

		const index = shuffledDeck.indexOf(card); 
		if (index !== -1) {
			shuffledDeck.splice(index, 1); 
		}

		this.updateHandValue();  
		this.updateAceCount(card); 
	}

	updateHandValue() {
		let value = 0;
		this.#aceCount = 0;

		this.#hand.forEach(card => {
			value += card.cardvalue; 
			if (card.carddisplay.includes('Ace')) {
				this.#aceCount++;  // Count aces
			}
		});

		this.#handValue = value;
		while (this.#handValue > 21 && this.#aceCount > 0) {
			this.#handValue -= 10;
			this.#aceCount--; 
		}
	}

	updateAceCount(card) {
		if (card.carddisplay.includes('Ace')) {
			this.#aceCount++;
		}
	}
}

/*-------------------------------------------------------------->
	Shuffle Function (Creates a Copy of the Deck)
<--------------------------------------------------------------*/

function shuffle(deck) {
	const shuffledDeck = [...deck]; 
	for (let i = shuffledDeck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; 
	}
	return shuffledDeck;
}

let shuffledDeck = shuffle([...cardObjects]);

const player = new Player();
const dealer = new Player();

function updateDisplay() {
	playerDisplay.textContent = player.handDisplayText.join(', ');
	playerValueDisplay.textContent = `${player.handValue}`;
	updateDisplayImages(player.handDisplayImg, playerImgDisplay);

	dealerDisplay.textContent = dealer.handDisplayText[0];
	updateDisplayImages(dealer.handDisplayImg.slice(0, 1), dealerImgDisplay);
}

let isDouble = false;

function updateDisplayImages(images, imageWrapper) {
	imageWrapper.innerHTML = '';  

	images.forEach(imageSrc => {
		let imgElement = createImage(imageSrc);
		imageWrapper.appendChild(imgElement);
	});
}

function startingDeal() {
	player.addCard(shuffledDeck[0], shuffledDeck);
	dealer.addCard(shuffledDeck[0], shuffledDeck);
	player.addCard(shuffledDeck[0], shuffledDeck);
	dealer.addCard(shuffledDeck[0], shuffledDeck);

	updateDisplay();
}

function hit(handObj) {
	handObj.addCard(shuffledDeck[0], shuffledDeck);
	bustCheck(handObj);
	updateDisplay();
}

function dealerTurn() {
	while (dealer.handValue < 17) {
		hit(dealer);
	}
	updateDisplay(); 
}

function bustCheck(handObj) {
	if (handObj.handValue > 21) {  
			if (handObj === player) {
					finalResultDisplay.textContent = 'YOU BUSTED! YOU LOSE!';
					hitButton.classList.add('hidden');
					holdButton.classList.add('hidden');
					doubleButton.classList.add('hidden');

					startButton.classList.remove('hidden');
					arrowButtons.classList.remove('hidden');
			} else if (handObj === dealer) {
					finalResultDisplay.textContent = 'DEALER BUSTS! YOU WIN!';
					hitButton.classList.add('hidden');
					holdButton.classList.add('hidden');
					doubleButton.classList.add('hidden');

					startButton.classList.remove('hidden');
					arrowButtons.classList.remove('hidden');
			}
	}
	isDouble = false;
}

let playerBank = 1000;
let playerBet = 10;
let playerBetTotal = 0;
let pot = 0;

function finalResult() {
  if (dealer.handValue > 21) {
    finalResultDisplay.textContent = 'DEALER BUSTS! YOU WIN!';
		if (isDouble === true) {
			pot = pot * 2;
		}
    playerBank += pot; 
  } else if (dealer.handValue > player.handValue) {
    finalResultDisplay.textContent = 'DEALER WINS!';
		if (isDouble === true) {
			pot = pot * 2;
		}
  } else if (dealer.handValue < player.handValue) {
    finalResultDisplay.textContent = 'YOU WIN!';
    playerBank += pot; 
  } else {
    finalResultDisplay.textContent = 'PUSH';
    playerBank += playerBetTotal; 
  }

  pot = 0;
	isDouble = false;
  updateBankDisplay();
  hitButton.classList.add('hidden');
  holdButton.classList.add('hidden');
	doubleButton.classList.add('hidden');

	startButton.classList.remove('hidden');
	arrowButtons.classList.remove('hidden');
}


function updateBankDisplay() {
  bankDisplay.textContent = `${playerBank}`;
}


function updateTotalBet() {
  totalPlayerBet.textContent = `${playerBetTotal}`;
}


function resetGame() {
  player.hand = [];
  player.handValue = 0;
  player.aceCount = 0;
  player.handDisplayImg = [];
  player.handDisplayText = [];

  dealer.hand = [];
  dealer.handValue = 0;
  dealer.aceCount = 0;
  dealer.handDisplayImg = [];
  dealer.handDisplayText = []; 

  shuffledDeck = shuffle([...cardObjects]);

  finalResultDisplay.textContent = '';
  playerDisplay.textContent = '';
  playerValueDisplay.textContent = '';
  dealerDisplay.textContent = '';

  updateBankDisplay();
  updateTotalBet();
}


function startBtn() {
	resetGame();
  pot = playerBetTotal * 2; // Pot is double the player's bet
	if (pot <= 0) {
		console.log("You must place a bet");
		return;
	}
  startingDeal();
	doubleButton.classList.remove('hidden');
  hitButton.classList.remove('hidden');
  holdButton.classList.remove('hidden');

	startButton.classList.add('hidden'); 
	arrowButtons.classList.add('hidden');
  updateDisplay();
}


function hitBtn() {
	hit(player);
	updateDisplay();
}

function holdBtn() {
	dealerTurn();
	finalResult();
}

function doubleBtn() {
	isDouble = true;
	console.log(isDouble);
	hit(player);
	holdBtn();
}

updateBankDisplay();

listen('click', startButton, () => { 
	startBtn();
}); 

listen('click', hitButton, () => {
	hitBtn();
});

listen('click', holdButton, () => {
	holdBtn();
});

listen('click', doubleButton, () => {
	doubleBtn();
});

listen('click', increaseBet, () => {
  if (playerBank >= playerBet) { // Ensure player has enough funds
    playerBetTotal += playerBet; 
    playerBank -= playerBet; 
    updateBankDisplay();
    updateTotalBet();
  } else {
    finalResultDisplay.textContent = 'Not enough funds to increase bet!';
  }
});

listen('click', decreaseBet, () => {
  if (playerBetTotal >= playerBet) { // Ensure the bet total doesn't go below zero
    playerBetTotal -= playerBet; 
    playerBank += playerBet; 
    updateBankDisplay();
    updateTotalBet();
		console.log(isDouble);
  }
});

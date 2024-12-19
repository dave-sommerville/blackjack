'use strict';
/*-------------------------------------------------------------->
Utility Functions 
<--------------------------------------------------------------*/
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

function shuffle(deck) {
  const shuffledDeck = [...deck]; 
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; 
  }
  return shuffledDeck;
}

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

let convert = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6)
      return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9)
      return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12)
      return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

/*-------------------------------------------------------------->
  Initial Declarations 
<--------------------------------------------------------------*/

const dealerDisplay = select('.dealer-display');
const dealerValueDisplay = select('.dealer-value-display');
const dealerImgDisplay = select('.dealer-image-wrapper');
const dealerInfoButton = select('.dealer-info');
const playerInfoButton = select('.player-info');
const finalResultDisplay = select('.final-result-display');
const playerDisplay = select('.player-display');
const playerValueDisplay = select('.player-value-display');
const playerImgDisplay = select('.player-image-wrapper');
const dealBetButton = select('.deal-bet');
const startButton = select('.start-btn');
const hitButton = select('.hit-btn');
const holdButton = select('.hold-btn');
const doubleButton = select('.double-btn');
const restartButton = select('.restart-btn');
const increaseBetTen = select('.bet10');
const increaseBetFifty = select('.bet50');
const increaseBetHundred = select('.bet100');

const decreaseBetTen = select('.down10');
const decreaseBetFifty = select('.down50');
const decreaseBetHundred = select('.down100');
const placeBet = select('.place-bet');
const betScreen = select('.bet-banking-area');
const bankDisplay = select('.player-bank');
const sideBankDisplay = select('.side-bank-display');
const bankWrapper = select('.bank-wrapper');
const totalPlayerBet = select('.pot');
const sidePlayerBet = select('.side-pot');

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

<--------------------------------------------------------------*/
let shuffledDeck = shuffle([...cardObjects]);

const player = new Player();
const dealer = new Player();

let playerBank = 1000;
let playerBetTotal = 0;
let pot = 0;

/*-------------------------------------------------------------->
  Display Functions 
<--------------------------------------------------------------*/
function hideActionButtons() {
  hitButton.classList.add('hidden');
  holdButton.classList.add('hidden');
  if (!doubleButton.classList.contains('hidden'))
    doubleButton.classList.add('hidden');
}

function hideDealShowAction() {
  hitButton.classList.remove('hidden');
  holdButton.classList.remove('hidden');
  doubleButton.classList.remove('hidden');

  startButton.classList.add('hidden');
}

function updateDisplayImages(images, imageWrapper) {
  imageWrapper.innerHTML = '';  

  images.forEach(imageSrc => {
    let imgElement = createImage(imageSrc);
    imageWrapper.appendChild(imgElement);
  });
}

function dealerFirstDisplay () {
  const li = document.createElement('li'); 
  li.textContent = dealer.handDisplayText[0];; 
  dealerDisplay.appendChild(li); 
  updateDisplayImages(dealer.handDisplayImg.slice(0, 1), dealerImgDisplay);
}

function updateDisplay(player, targetUL, targetImgDis) {
  targetUL.innerHTML = ''; 
  player.handDisplayText.forEach((text) => {
    const li = document.createElement('li'); 
    li.textContent = text; 
    targetUL.appendChild(li); 
  });
  updateDisplayImages(player.handDisplayImg, targetImgDis);  
}

function updateBankDisplay() {
  let convertedBank = convert(playerBank);
  bankDisplay.textContent = `${convertedBank}`;
  sideBankDisplay.textContent = `${convertedBank}`;
}

function updateTotalBet() {
  let convertedBet = convert(playerBetTotal);
  totalPlayerBet.textContent = `${convertedBet}`;
  sidePlayerBet.textContent = `${convertedBet}`;
}

/*-------------------------------------------------------------->
  Gameplay Functions 
<--------------------------------------------------------------*/

function startingDeal() {
  player.addCard(shuffledDeck[0], shuffledDeck);
  dealer.addCard(shuffledDeck[0], shuffledDeck);
  player.addCard(shuffledDeck[0], shuffledDeck);
  dealer.addCard(shuffledDeck[0], shuffledDeck);
  updateDisplay(player, playerDisplay, playerImgDisplay);
  playerValueDisplay.textContent = player.handValue;
  dealerFirstDisplay();
}

function isBlackJack() {
  if (player.handValue === 21) {
    return true;
  } else {
    return false;
  }
}


///*****************************///
function blackJackPayout() {
  pot = pot * 1.5;
  playerBank = playerBank + pot;
  pot = 0;
  playerBetTotal = 0;
  updateBankDisplay();
  hideActionButtons();
}

function hit(handObj) {
  handObj.addCard(shuffledDeck[0], shuffledDeck);
  bustCheck(handObj);
}

function dealerTurn() {
  while (dealer.handValue < 17) {
    hit(dealer);
  }
  updateDisplay(player, playerDisplay, playerImgDisplay); 
  playerValueDisplay.textContent = player.handValue;
}

function bustCheck(handObj) {
  if (handObj.handValue > 21) {  
      if (handObj === player) {
        finalResultDisplay.textContent = 'YOU BUSTED! YOU LOSE!';
        hideActionButtons();
        restartButton.classList.remove('hidden');
        pot = 0;
        playerBetTotal = 0;
        totalPlayerBet.textContent = '';
        sidePlayerBet.textContent = '';
      } else if (handObj === dealer) {
          finalResultDisplay.textContent = 'DEALER BUSTS! YOU WIN!';
          hideActionButtons();
          restartButton.classList.remove('hidden');
          playerBank += pot; 
          pot = 0;
          playerBetTotal = 0;
          totalPlayerBet.textContent = '';
          sidePlayerBet.textContent = '';
      }
  }

}

function dealerCheck() {
  if (dealer.handValue > 21) {
    finalResultDisplay.textContent = 'DEALER BUSTS! YOU WIN!';
    playerBank += pot; 
  } else if (dealer.handValue > player.handValue) {
    finalResultDisplay.textContent = 'DEALER WINS!';
  } else if (dealer.handValue < player.handValue) {
    finalResultDisplay.textContent = 'YOU WIN!';
    playerBank += pot; 
  } else {
    finalResultDisplay.textContent = 'PUSH';
    playerBank += playerBetTotal; 
  }
}

function finalResult() {
  updateDisplay(dealer, dealerDisplay, dealerImgDisplay);
  updateBankDisplay();
  hideActionButtons();
  dealerCheck();
  restartButton.classList.remove('hidden');
  pot = 0;
  playerBetTotal = 0;
  totalPlayerBet.textContent = '';
  sidePlayerBet.textContent = '';
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

/*-------------------------------------------------------------->
  Button Functions 
<--------------------------------------------------------------*/
function potDecrease(value) {
  if (playerBetTotal >= value) { 
    playerBetTotal -= value; 
    playerBank += value; 
    updateBankDisplay();
    updateTotalBet();
  }
}

function potIncrease(value) {
  if (playerBank >= value) { 
    playerBetTotal += value; 
    playerBank -= value; 
    updateBankDisplay();
    updateTotalBet();
  } else {
    finalResultDisplay.textContent = 'Not enough funds to increase bet!';
  }
}

function setBet() {
  pot = playerBetTotal * 2; 
  if (pot <= 0) {
    totalPlayerBet.textContent = 'required';  
    return;
  }
  betScreen.classList.remove('visible');
  bankWrapper.classList.add('visible');
  startBtn();
}

function startBtn() {
  resetGame()
  finalResultDisplay.textContent = 'DEALING...';
  setTimeout(() => {
    finalResultDisplay.textContent = '';
    startingDeal();
  }, 1000);
  if (isBlackJack()) {
    blackJackPayout();
  } else {
    hideDealShowAction();
  }
}

function hitBtn() {
  hit(player);
  doubleButton.classList.add('hidden');
  updateDisplay(player, playerDisplay, playerImgDisplay);
  playerValueDisplay.textContent = player.handValue;
}

function holdBtn() {
  dealerTurn();
  finalResult();
}


listen('click', doubleButton, () => {
  if (playerBank >= playerBetTotal) {
    playerBank -= playerBetTotal;
    pot += playerBetTotal;
    playerBetTotal *= 2;
    updateBankDisplay();
    updateTotalBet();

    player.addCard(shuffledDeck[0], shuffledDeck);
    updateDisplay(player, playerDisplay, playerImgDisplay);
    playerValueDisplay.textContent = player.handValue;

    bustCheck(player); 
    hideActionButtons(); 
    if (player.handValue <= 21) {
      dealerTurn();
      finalResult();
    }
  } else {
    finalResultDisplay.textContent = "Not enough bank to double!";
  }

});

function restartBtn() {
  betScreen.classList.add('visible');
  bankWrapper.classList.remove('visible');
  restartButton.classList.add('hidden');
  finalResultDisplay.textContent = '';
  playerImgDisplay.innerHTML = '';
  dealerImgDisplay.innerHTML = '';
}

/*-------------------------------------------------------------->
  Page Load and Listeners
<--------------------------------------------------------------*/

listen('load', window, () => {
  updateBankDisplay(player, playerDisplay, playerImgDisplay);
  updateBankDisplay(dealer, dealerDisplay, dealerImgDisplay);
});

listen('click', startButton, () => { 
  startBtn();
}); 

listen('click', hitButton, () => {
  hitBtn();
  
});

listen('click', holdButton, () => {
  holdBtn();
});

listen('load', window, () => {
  betScreen.classList.add('visible');
});

listen('click', increaseBetTen, () => {
  potIncrease(10);
});

listen('click', increaseBetFifty, () => {
  potIncrease(50);
});

listen('click', increaseBetHundred, () => {
  potIncrease(100);
});

listen('click', decreaseBetTen, () => {
  potDecrease(10);
});

listen('click', decreaseBetFifty, () => {
  potDecrease(50);
});

listen('click', decreaseBetHundred, () => {
  potDecrease(100);
});

listen('click', placeBet, () => {
  setBet();
});

listen('click', restartButton, () => {
  restartBtn();
});

//    DPOUBLE UP AND RENAME FOR PLAYERS LIS (CLEAN UP FUNCTIONS)

listen('click', dealerInfoButton, () => {
  dealerInfoButton.classList.toggle('growth');
});

listen('click', playerInfoButton, () => {
  playerInfoButton.classList.toggle('growth');
});
'use strict';
import { cardObjects } from "./deck.js";
import { select, listen, isImageFile, createImage, shuffle } from "./utils.js";
import { Player } from "./class.js";

/*-------------------------------------------------------------->
  Initial Declarations 
<--------------------------------------------------------------*/

const dealerDisplay = select('.dealer-display');
const dealerValueDisplay = select('.dealer-value-display');
const dealerImgDisplay = select('.dealer-image-wrapper');
const dealerInfoDisplay = select('.dealer-info');
const dealerInfoButton = select('.dealer-btn');
const playerInfoDisplay = select('.player-info');
const playerInfoButton = select('.player-btn');
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
Specialty Functions
<--------------------------------------------------------------*/
let shuffledDeck = shuffle([...cardObjects]);

const player = new Player();
const dealer = new Player();

let playerBank = 1000;
let playerBetTotal = 0;
let pot = 0;

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
  if (isBlackJack()) {
    blackJackPayout();
  } else {
    hideDealShowAction();
  }
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

function blackJackPayout() {
  pot = pot * 1.5;
  playerBank = playerBank + pot;
  pot = 0;
  playerBetTotal = 0;
  updateBankDisplay();
  hideActionButtons();
  restartBtn();
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
  updateBankDisplay();
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
  dealerCheck();
  updateBankDisplay();
  hideActionButtons();
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

function doubleBtn() {
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
}

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

listen('click', doubleButton, () => {
  doubleBtn();
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

listen('click', dealerInfoButton, () => {
  dealerInfoDisplay.classList.toggle('growth');
});

listen('click', playerInfoButton, () => {
  playerInfoDisplay.classList.toggle('growth');
});
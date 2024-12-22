
# JavaScript Exercise: Blackjack
I first began creating a Blackjack game the same week that I started learning JavaScript. It immediately came to mind as a good beginner project for several reasons. The game shares a similar logic structure to JavaScript as well as managing numerous values and conditions. It has given me good practice in creating functions and nesting them. It has also allowed me to explore objects in JavaScript and see how they work as parameters. The game's logic and image display aspects have recently been made functional, while betting is not. The project is nearing being finished, but there are a number of things left to be adjusted. 


## Features
- Game play area
- Player Class: For initializing player and dealer objects
	- This allows for methods to identify aspects of the player objects that are needed for gameplay.
-	Deck is treated as an array of objects. This allows tracking of numerous aspects
	- This includes a full svg deck
- The deck is shuffled using the Fisher-Yates method (with time complexity of O(n))
- Player can place bet, hit, hold, and double
- Dealer logic implements dealer's turn

## Badges
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)
## Planned Features and Fixes 
- Add music/sound effects  
- Further gameplay animations 
- Player bank added to localStorage
- Method for player to top up their bank if too low
- Watch for a natural 21 
  - Deal payout not currently functioning 
  - Dealer 21 while showing Ace auto finishes game 
  - Player given insurance option 
- Watch for twin cards 
  - Play split hands as two rounds in same UI 

### Preview 
![Website Preview](./src/img/scrnshot-preview.jpg)
### Image Attribution

**Image by:** [Harald Eicher](https://pixabay.com/users/teacherbingo-18391860/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7155166)  
**Source:** [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7155166)  

### Icon Attribution
**SVG Deck**  
- [Icon by TekEye](https://tekeye.uk/playing_cards/svg-playing-cards#google_vignette)

**Piggy Bank Icon**  
- [Icon by Muhammad Haq](https://freeicons.io/business-collection-icon/piggy-bank-icon-22292) on [freeicons.io](https://freeicons.io)


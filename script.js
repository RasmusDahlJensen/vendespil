import cards from "./cardArray.js";

const root = document.getElementById("root");
root.innerHTML = `
<div class="scoreContainer">
<div>Score:</div>
<div id="score">0</div>
</div>
<div class="flexCenter">
<div id="gameContainer"></div>
</div>`;
const container = document.getElementById("gameContainer");

//Here i shorten the array to 10 and then after that i doble it to fit the array
const shortenedCards = cards.slice(0, 10);
const doubled = shortenedCards.concat(shortenedCards);

//Doubles the cards with concat by calling it self to return a new array
//Shuffles them with essentially the Schwartzian transform
const cardsShuffled = doubled
	.map((card) => ({ card, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ card }) => card);

//Prints out the given values as cards on the website
const renderGame = () => {
	cardsShuffled.forEach((card) => {
		container.innerHTML += `
        <div class="card" id="${card.id}">
            <div class="content">
            <div class="front"></div>
                <div class="back">
                <img src="${card.picture}"/>
                </div>
            </div>
        </div>
        `;
	});
};
renderGame();

const buttons = document.querySelectorAll(".card");
const buttonFunctionality = () => {
	buttons.forEach((card) => {
		card.addEventListener("click", () => {
			playGame(event.target.parentElement.parentElement);
		});
	});
};
buttonFunctionality();

//TODO: Disable eventlistener when a card is clicked so you can't match it with itself
//Re-enable if they're not matching and flip card

let cardFlips = 0;
let cardA = 0;
let cardB = 0;
let score = 0;
const playGame = (card) => {
	//Flipped card counter
	cardFlips++;

	if (cardFlips <= 2) {
		card.classList.add("flip");
	}

	//assigning the values
	cardA == 0 ? (cardA = card.id) : (cardB = card.id);

	//when two cards have been flipped:
	if (cardFlips == 2) {
		if (cardA == cardB) {
			score++;
			scoreboard.innerHTML = score;
			const flipped = document.querySelectorAll(".flip:not(.match)");
			flipped.forEach((flip) => flip.classList.add("match"));
		}
		//Reset
		setTimeout(() => {
			unFlip();
		}, 750);
	}
	console.log(score);
};

const unFlip = () => {
	document.querySelectorAll(".card:not(.match)").forEach((card) => {
		card.classList.remove("flip");
	});
	cardFlips = 0;
	cardA = 0;
	cardB = 0;
};

//Score / timer

const scoreboard = document.getElementById("score");

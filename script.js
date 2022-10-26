import cards from "./cardArray.js";
let container = document.getElementById("gameContainer");

//Here i shorten the array to 10 and then after that i doble it to fit the array
let shortenedCards = cards.slice(0, 10);
let doubled = shortenedCards.concat(shortenedCards);

//Doubles the cards with concat by calling it self to return a new array
//Shuffles them with essentially the Schwartzian transform
let cardsShuffled = doubled
	.map((card) => ({ card, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ card }) => card);

//Prints out the given values as cards on the website
let renderGame = () => {
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

let cardFlips = 0;
let cardA = 0;
let cardB = 0;
const playGame = (card) => {
	//Flipped card counter
	cardFlips++;
	console.log(cardFlips);

	if (cardFlips <= 2) {
		card.classList.add("flip");
	}

	//assigning the values
	cardA == 0 ? (cardA = card.id) : (cardB = card.id);

	//when two cards have been flipped:
	if (cardFlips == 2) {
		//If the values are matching then:
		if (cardA == cardB) {
			const flipped = document.querySelectorAll(".flip:not(.match)");
			flipped.forEach((flip) => flip.classList.add("match"));
		}
		//Reset
		cardFlips = 0;
		cardA = 0;
		cardB = 0;
	}
};

const buttonFunctionality = () => {
	buttons.forEach((card) => {
		card.addEventListener("click", () => {
			playGame(event.target.parentElement.parentElement);
		});
	});
};

buttonFunctionality();

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
let createGame = () => {
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
createGame();


let a = 0;
let b = 0;
const cardButtons = document.querySelectorAll(".card");
cardButtons.forEach((card) => {
	card.addEventListener("click", () => {
		if (a == 0) {
			a = card.id;
		} else {
			b = card.id;
			evaluateCards(a, b);
			//Reset after evaluating
			a = 0;
			b = 0;
		}
	});
});

let evaluateCards = (a, b) => {
	if (a == b) {
		console.log("Congratulations, they're matching");
		return true;
	} else {
		console.log("they're not matching");
		return false;
	}
};

import cards from "./cardArray.js";

//Intial site state
const initialState = () => {
	const root = document.getElementById("root");
	root.innerHTML += `
	<div id="flexCenter">
		<div class="scoreContainer">
			<div>Score:</div>
			<div id="score">0</div>
		<div id="timer">
			<div id="minutes">00</div>
			:
			<div id="seconds">00</div>
		</div>
		</div>
		<div>
		</div>
			<div id="gameContainer"></div>
		</div>
	</div>`;
	const hideGame = document.getElementById("flexCenter");
	hideGame.style.display = "none";
};

initialState();

//Here i shorten the array to 10 and then after that i doble it to fit the array
const shortenedCards = cards.slice(0, 10);
const doubled = shortenedCards.concat(shortenedCards);

//Doubles the cards with concat by calling it self to return a new array
//Shuffles them with essentially the Schwartzian transform
const cardsShuffled = doubled
	.map((card) => ({ card, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ card }) => card);

//Cardflip states
let cardFlips = 0;
let cardA = 0;
let cardB = 0;
let score = 9;

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
};

//Prints out the given values as cards on the website
const renderGame = () => {
	const container = document.getElementById("gameContainer");
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

//Apply eventlisteners to all cards
const buttons = document.querySelectorAll(".card");
const buttonFunctionality = () => {
	buttons.forEach((card) => {
		card.addEventListener("click", () => {
			if (card.classList == "card") {
				playGame(event.target.parentElement.parentElement);
			}
		});
	});
};
buttonFunctionality();

const unFlip = () => {
	document.querySelectorAll(".card:not(.match)").forEach((card) => {
		card.classList.remove("flip");
	});
	cardFlips = 0;
	cardA = 0;
	cardB = 0;
};
let scoreboard = document.getElementById("score");

//Timer

const timer = () => {
	const minutesLabel = document.getElementById("minutes");
	const secondsLabel = document.getElementById("seconds");
	let totalSeconds = 0;
	setInterval(setTime, 1000);

	function setTime() {
		++totalSeconds;
		secondsLabel.innerHTML = pad(totalSeconds % 60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
	}

	function pad(val) {
		const valString = val + "";
		if (valString.length < 2) {
			return "0" + valString;
		} else {
			return valString;
		}
	}
};

//Ending

window.addEventListener("click", () => {
	if (score == 10) {
		showScore();
		playAgain();
		console.log("reset");
	}
});

const showScore = () => {
	const buttonFlex = document.getElementsByClassName("flex");
	const endScore = document.getElementById("showScore");
	buttonFlex[0].style.display = "";
	endScore.innerHTML = "Your score is: " + score;
};

const playAgain = () => {
	const hideGame = document.getElementById("flexCenter");
	const start = document.getElementById("startGame");
	start.style.display = "";
	start.innerHTML = "Play again?";
	hideGame.style.display = "none";
	start.addEventListener("click", gameStart);
};

const gameStart = () => {
	const hideGame = document.getElementById("flexCenter");
	start.style.display = "none";
	hideGame.style.display = "";
	buttonFlex[0].style.display = "none";
	timer();
};

//Start button
const start = document.getElementById("startGame");
const buttonFlex = document.getElementsByClassName("flex");
start.addEventListener("click", gameStart);

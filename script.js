import cards from "./cardArray.js";

const difficulty = (difficulty) => {
	//Intial site state before the game is played
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

	//Here I modify the array depending on the difficulty choice
	const shortenedCards = cards.slice(0, difficulty);
	const doubled = shortenedCards.concat(shortenedCards);

	//Doubles the cards with concat by calling it self to return a new array
	//Shuffles them with essentially the Schwartzian transform
	const cardsShuffled = doubled
		.map((card) => ({ card, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ card }) => card);

	//The default states for the cardflips are defined here.
	let cardFlips = 0;
	let cardA = 0;
	let cardB = 0;
	let score = 0;

	const playGame = (card) => {
		//Flipped card counter
		cardFlips++;

		//If the amount of cards that have been flipped are less than two, it'll flip them when clicked
		//It has to be equal to or less or it bugs out, but it definitely just works on two
		if (cardFlips <= 2) {
			card.classList.add("flip");
		}

		//assigning the values
		cardA == 0 ? (cardA = card.id) : (cardB = card.id);

		//when two cards have been flipped, they'll be matched with eachother, if they are matched they'll receive the
		//"match" class to differentiate them
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

	//Apply eventlisteners to all cards with a forEach loop
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

	//When called it'll unflip every that that hasn't been matched - hence the :not selector
	//And then rests the amount of card flips that's happening and also the comparison values
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
		if (score == difficulty) {
			showScore();
			playAgain();
		}
	});

	const showScore = () => {
		//Shows the end screen with a play again button
		const buttonFlex = document.getElementsByClassName("flex");
		const endScore = document.getElementById("showScore");
		const start = document.getElementById("startGame");
		const easy = document.getElementById("easy");
		const medium = document.getElementById("medium");
		const hard = document.getElementById("hard");
		easy.style.display = "none";
		medium.style.display = "none";
		hard.style.display = "none";
		buttonFlex[0].style.display = "";
		start.style.display = "";
		endScore.innerHTML = "Your score is: " + score;
	};

	//Hides the elements after the game is over
	const playAgain = () => {
		const hideGame = document.getElementById("flexCenter");
		const start = document.getElementById("startGame");
		start.style.display = "";
		hideGame.style.display = "none";
	};

	//Starts the game and the timer once its called
	const gameStart = () => {
		const hideGame = document.getElementById("flexCenter");
		start.style.display = "none";
		hideGame.style.display = "";
		buttonFlex[0].style.display = "none";
		timer();
	};
	// Reset buttons
	const start = document.getElementById("startGame");
	const buttonFlex = document.getElementsByClassName("flex");
	start.addEventListener("click", () => {
		location.reload();
	});
	gameStart();
};

const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

easy.addEventListener("click", () => {
	difficulty(5);
});
medium.addEventListener("click", () => {
	difficulty(10);
});
hard.addEventListener("click", () => {
	difficulty(15);
});

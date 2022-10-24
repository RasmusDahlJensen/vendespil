import cards from "./cardArray.js";

let container = document.getElementById("gameContainer");

cards.forEach((element) => {
	console.log(element);
	console.log(element.picture);
	container.innerHTML += `
    <div class="card">
    <div class="cardInside">
        <div class="cardFront">
    </div>
    <div class="cardBack">
    <img src="${element.picture}"/></div>
    </div>
    `;
});

"use strict";
//------------------Initialization--------------------
const gameContainer = document.getElementById("game");
const card1 = {};
const card2 = {};
let cardCount = 0;
let matchCount = 0;
const NSQUARES = 5; //number of squares divided by 2
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];
//--------------------Program-------------------------
// shuffledColors is an array holding a list of pairs of random paired colors
let shuffledColors = shuffle(COLORS);

// when the DOM loads
createDivsForColors(shuffledColors);
//-------------------Functions------------------------
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
//-------------------------------------------------------
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//---------------------------------------------------------
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  const card = event.target;
  const classColor = event.target.getAttribute("class");

  if (cardCount === 0) {
    card1.el = card;
    card1["el"].removeEventListener("click", handleCardClick);
    card1.color = card.getAttribute("class");

    card.style.backgroundColor = classColor;
    cardCount++;
  } else if (cardCount === 1) {
    card2.el = card;
    card2["el"].removeEventListener("click", handleCardClick);
    card2.color = card.getAttribute("class");

    card.style.backgroundColor = classColor;

    cardCount = 0;

    //check for colors to match
    if (card1.color === card2.color) {
      //if colors match deactivate each
      card1["el"].removeEventListener("click", handleCardClick);
      card2["el"].removeEventListener("click", handleCardClick);
      matchCount++;
      if (matchCount === NSQUARES) gameover();
    } else {
      //colors dont match
      setTimeout(() => {
        card1["el"].removeAttribute("style");
        card2["el"].removeAttribute("style");
        card1["el"].addEventListener("click", handleCardClick);
        card2["el"].addEventListener("click", handleCardClick);
      }, 1000);
    }
  }
}
function gameover() {
  const h1 = document.querySelector("h1");
  h1.innerText += "   You Win!";

  const playButton = document.createElement("button");
  playButton.innerText = "Play Again";
  playButton.classList.add("btn");
  h1.append(playButton);
  playButton.addEventListener("click", () => {
    console.log("RESTART");
    location.reload();
  });
}

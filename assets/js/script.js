("use strict");

//GET ELEMENTS FROM DOM
let counterContainer = document.querySelector(".counter-container");
let bodyBg = document.querySelector("body");

//FUNCTION TO CREATE COUNTER'S ELEMENTS
function createCounterElms(btnName, counterBtnClass, counterBtnContent) {
  btnName = document.createElement("div");
  btnName.classList.add(counterBtnClass, "btn");
  btnName.innerText = counterBtnContent;
  counterContainer.appendChild(btnName);
  return btnName;
}

//CREATE DISPLAY
let counterDisplay = createCounterElms(
  "counterDisplay",
  "counter-display",
  "0"
);

//CREATE + - AND RESET BUTTON
let moreCounterBtn = createCounterElms("moreBtn", "more-btn", "+");
let lessCounterBtn = createCounterElms("lessBtn", "less-btn", "−");
let resetCounterBtn = createCounterElms("resetBtn", "reset-btn", "Reset");

//BTNS WORKING with clicking
counterContainer.addEventListener("click", (event) => {
  counterContainer.classList.add("btn-animation"); //animate display container on click
  if (event.target.classList.contains("more-btn")) {
    counterDisplay.textContent++; //encreasing counter with + btn
    catSpawn();
  } else if (
    event.target.classList.contains("less-btn") &&
    counterDisplay.textContent > 0
  ) {
    counterDisplay.textContent--; //decreasing counter with - btn only if counter content >0 (prevent going below 0)
    catRemoval();
    if (counterDisplay.textContent == 0) {
      //if counter value is 0 reset bg
      bodyBg.style.backgroundImage = "";
      counterDisplay.textContent = "0";
    }
  } else if (event.target.classList.contains("reset-btn")) {
    //reset counter and bg with - btn
    counterDisplay.innerHTML = "0";
    bodyBg.style.backgroundImage = "";
    remouveAllCats();
  }
});

//BTNS WORKING with keyboard
document.addEventListener("keydown", (e) => {
  if ((e.keyCode || e.key) === 187) {
    counterDisplay.textContent++; //encreasing counter with + btn
    catSpawn();
  } else if ((e.keyCode || e.key) === 189 && counterDisplay.textContent > 0) {
    counterDisplay.textContent--; //decreasing counter with - btn
    catRemoval();
  } else if ((e.keyCode || e.key) === 46) {
    //reset counter and bg with - btn
    counterDisplay.innerHTML = "0";
    bodyBg.style.backgroundImage = "";
    remouveAllCats();
  }
});

//ADD THE CUTENESS
let cats = [
  //cats illustrations
  "assets/img/cat-1.png",
  "assets/img/cat-2.png",
  "assets/img/cat-3.png",
  "assets/img/cat-4.png",
  "assets/img/cat-5.png",
  "assets/img/cat-6.png",
  "assets/img/cat-7.png",
  "assets/img/cat-8.png",
  "assets/img/cat-9.png",
  "assets/img/cat-10.png",
  "assets/img/cat-11.png",
];

let catMeows = [
  //cats sounds
  "assets/sounds/meow-1.mp3",
  "assets/sounds/meow-2.mp3",
  "assets/sounds/meow-3.mp3",
  "assets/sounds/meow-4.mp3",
  "assets/sounds/meow-5.mp3",
  "assets/sounds/meow-6.mp3",
  "assets/sounds/meow-7.mp3",
];

let sadMeow = new Audio("assets/sounds/sad-meow.mp3"); //sad cat sound

//-- play random meow
function playRandomMeow() {
  let meowIndex = Math.floor(Math.random() * catMeows.length);
  let meow = new Audio(catMeows[meowIndex]);
  meow.play();
}

//-- function to pop random cat img
function catSpawn() {
  let catImg = document.createElement("img");
  catImg.src = cats[Math.floor(Math.random() * cats.length)]; //-- generate random cat img url
  //remove background
  bodyBg.style.backgroundImage = "none";
  bodyBg.style.backgroundUrl = "";
  //img random coordinates
  catImg.style.top =
    (document.body.clientHeight - catImg.offsetHeight / 2) * Math.random() +
    "px";
  catImg.style.left =
    (document.body.clientWidth - catImg.offsetWidth / 2) * Math.random() + "px";
  //append to body
  document.body.appendChild(catImg);
  //add meow Sound
  playRandomMeow();
}

//-- function to remove last element cat added
function catRemoval() {
  let allCats = document.querySelectorAll("img");
  let removedCat = Array.from(allCats).pop();
  removedCat.parentNode.removeChild(removedCat);
  //add sad meow Sound
  sadMeow.play();
}

//-- function to remove all cats
function remouveAllCats() {
  let allCats = Array.from(document.querySelectorAll("img"));
  for (let i = 0; i < allCats.length; i++) {
    allCats[i].parentNode.removeChild(allCats[i]);
  }
}

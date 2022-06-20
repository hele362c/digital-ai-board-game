"use strict";

window.addEventListener("DOMContentLoaded", start);

let card;
let popupSound = document.querySelector("#popupSound");
let diceSound = document.querySelector("#diceSound");
let isModalOpen = false;

function start() {
  loading_anim();
  hentData();
}

let currentAnswers = [];

function loading_anim() {
  const number = document.querySelector(".number");
  const game = document.querySelector(".cardList");
  const dice = document.querySelector("#ui_dado");
  const roll = document.querySelector(".rollme");
  const loader = document.querySelector(".loading-animation");
  const blur = document.querySelector(".blur");
  const gameDetails = document.querySelector(".game_details");

  blur.style.visibility = "visible";
  number.style.display = "visible";

  game.style.display = "none";
  game.style.visibility = "hidden";
  dice.style.display = "none";
  dice.style.visibility = "hidden";
  roll.style.display = "none";
  roll.style.visibility = "hidden";
  gameDetails.style.visibility = "hidden";

  setTimeout(() => {
    blur.style.visibility = "hidden";
    blur.style.display = "none";
    number.style.display = "none";
    loader.style.display = "none";
    number.style.visibility = "hidden";
    game.style.display = "grid";
    game.style.visibility = "visible";
    dice.style.display = "block";
    dice.style.visibility = "visible";
    roll.style.display = "block";
    roll.style.visibility = "visible";
    gameDetails.style.visibility = "visible";
  }, 3500);
}

const startingMinutes = 5;
let time = startingMinutes * 60;
const countDownEl = document.querySelectorAll("#countdown");

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDownEl.forEach((e) => (e.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`));
  time--;
  if (minutes == 0 && seconds == 0) {
    restartTimer();
  }
}

function restartTimer() {
  time = startingMinutes * 60;
}

async function hentData() {
  console.log("hentData");
  const result = await fetch("cardQuestions.json");
  card = await result.json();
  visCard();
}

function visCard() {
  const cardList = document.querySelector(".cardList");
  const template = document.querySelector("template").content;

  card.forEach((card) => {
    const klon = template.cloneNode(true);
    klon.querySelector(".icon").src = card.icon;
    klon.querySelector(".card_text").textContent = card.takeActionCard;
    //modal
    klon.querySelector("article").addEventListener("click", function () {
      isModalOpen = true;

      restartTimer();
      document.querySelector(".modal").classList.remove("hide");
      popupSound.play();
      const refreshIntervalId = setInterval(updateCountdown, 1000);
      document.querySelector(".modal-icon").src = card.iconModal;
      document.querySelector(".modal").style.borderColor = card.border;
      document.querySelector(".modal-header").textContent = card.header;
      document.querySelector(".modal-discussionQuestion").textContent = card.discussionQuestion;
      document.querySelector(".modal-questionAnswer").textContent = card.questionAnswer;
      if (card.id === 2 || card.id === 5 || card.id === 8 || card.id === 9 || card.id === 13 || card.id === 14 || card.id === 15 || card.id === 19 || card.id === 21 || card.id === 25) {
        const newEl = document.createElement("form");
        document.querySelector(".input-card").appendChild(newEl);
        const newEl2 = document.createElement("textarea");
        newEl2.placeholder = "Write down your answer here...";
        newEl2.style.borderColor = card.border;
        newEl.appendChild(newEl2);
        newEl.classList.add("insightsForm");
        setTimeout(() => {
          console.log("her er jeg");
          const elCreated = document.querySelector("form");
          elCreated.remove();
          currentAnswers.push(newEl2.value);
          localStorage.setItem("answers", JSON.stringify(currentAnswers));
        }, 300000);
      }

      document.querySelector(".modal-game-logo").src = card.gameLogo;
      const blur2 = document.querySelector(".blur");
      const gameDetails2 = document.querySelector(".game_details");
      const dice2 = document.querySelector("#ui_dado");
      const roll2 = document.querySelector(".rollme");
      const game2 = document.querySelector(".cardList");
      blur2.style.visibility = "visible";
      blur2.style.display = "block";
      dice2.style.visibility = "hidden";
      dice2.style.display = "none";
      gameDetails2.style.visibility = "hidden";
      roll2.style.visibility = "hidden";
      game2.style.display = "none";
      setTimeout(() => {
        document.querySelector(".modal").classList.add("hide");
        clearInterval(refreshIntervalId);
        isModalOpen = false;
        blur2.style.visibility = "hidden";
        blur2.style.display = "none";
        dice2.style.visibility = "visible";
        dice2.style.display = "block";
        gameDetails2.style.visibility = "visible";
        roll2.style.visibility = "visible";
        game2.style.display = "grid";
      }, 300000);
    });

    klon.querySelector("article").addEventListener("click", showColor);
    function showColor() {
      this.style.backgroundColor = "rgba(145, 145, 145, 0.4)";
      this.style.border = "6px solid rgba(255, 255, 255, 0.6)";
    }

    klon.querySelector("article").addEventListener("click", notModal);
    function notModal() {
      if (card.id === 0 || card.id === 4 || card.id === 7 || card.id === 12 || card.id === 17 || card.id === 23 || card.id === 24 || card.id === 26) {
        document.querySelector(".modal").classList.add("hide");
        const blur2 = document.querySelector(".blur");
        const gameDetails2 = document.querySelector(".game_details");
        const dice2 = document.querySelector("#ui_dado");
        const roll2 = document.querySelector(".rollme");
        const game2 = document.querySelector(".cardList");
        blur2.style.visibility = "hidden";
        blur2.style.display = "none";
        dice2.style.visibility = "visible";
        dice2.style.display = "block";
        gameDetails2.style.visibility = "visible";
        roll2.style.visibility = "visible";
        game2.style.display = "grid";
      }
    }
    cardList.appendChild(klon);
  });

  let squareArray = document.querySelectorAll(".square");
  const gameFigure = document.createElement("img");
  gameFigure.className = "gamePawn";
  gameFigure.src = "/staticAssets/gameFigure3.png";
  gameFigure.style.width = "2rem";
  squareArray.forEach((square) => {
    square.addEventListener(
      "focus",
      (event) => {
        console.log(event.target);
        event.target.insertBefore(gameFigure, event.target.children[0]);
      },
      true
    );
  });
}

document.querySelector(".unmutedButton").addEventListener("click", muteSound);
document.querySelector(".mutedButton").addEventListener("click", unmuteSound);

function muteSound() {
  document.querySelector(".unmutedButton").classList.add("hidden");
  document.querySelector(".mutedButton").classList.remove("hidden");

  popupSound.muted = true;
  diceSound.muted = true;
}

function unmuteSound() {
  document.querySelector(".mutedButton").classList.add("hidden");
  document.querySelector(".unmutedButton").classList.remove("hidden");

  popupSound.muted = false;
  diceSound.muted = false;
}

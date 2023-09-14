const riskNames = [
  "Interest Rate Risk",
  "Credit Risk",
  "Equity Market Risk",
  "Currency Risk",
  "Commodity Risk",
  "Liquidity Risk",
  "Volatility Risk",
];
var onceOnly = 0;
const riskDefinitionsMap = {
  "The potential for fluctuations in interest rates to impact the value of investments or financial instruments.":
    "Interest Rate Risk",
  "The risk of financial loss due to a borrower's inability to repay their debt obligations as agreed.":
    "Credit Risk",
  "The exposure to potential losses resulting from fluctuations in stock prices and broader market conditions.":
    "Equity Market Risk",
  "The risk of financial loss due to changes in exchange rates when investing in assets denominated in foreign currencies.":
    "Currency Risk",
  "The vulnerability to price fluctuations of commodities such as oil, metals, and agricultural products, impacts related investments.":
    "Commodity Risk",
  "The risk of being unable to quickly convert assets into cash without significant loss in value.":
    "Liquidity Risk",
  "The exposure to potential price instability and uncertainty, leading to unexpected changes in investment values.":
    "Volatility Risk",
};

const riskDefinitions = [
  "The potential for fluctuations in interest rates to impact the value of investments or financial instruments.",
  "The risk of financial loss due to a borrower's inability to repay their debt obligations as agreed.",
  "The exposure to potential losses resulting from fluctuations in stock prices and broader market conditions.",
  "The risk of financial loss due to changes in exchange rates when investing in assets denominated in foreign currencies.",
  "The vulnerability to price fluctuations of commodities such as oil, metals, and agricultural products, impacts related investments.",
  "The risk of being unable to quickly convert assets into cash without significant loss in value.",
  "The exposure to potential price instability and uncertainty, leading to unexpected changes in investment values.",
];
var eggClicked = 0;
var corr_audio = new Audio("./audio/correct.mp3");
var wrong_audio = new Audio("./audio/wrong.mp3");

var gameOver = 0;

const customCursor = document.createElement("img");
customCursor.src = "./assets/cursor.png";
customCursor.style.position = "absolute";
customCursor.style.pointerEvents = "none";
customCursor.style.height = "150px";

document.body.appendChild(customCursor);
document.body.style.cursor = "none";

function updateCursorPosition(event) {
  const isCursorOverStart = event.target.id.toLowerCase() === "start";
  const isCursorOverNext = event.target.id.toLowerCase() === "next";

  customCursor.style.left = event.clientX - customCursor.width / 2 + 28 + "px";
  customCursor.style.top = event.clientY - customCursor.height / 2 + 78 + "px";

  if (isCursorOverStart || isCursorOverNext) {
    customCursor.style.display = "none";
  } else {
    customCursor.style.display = "block";
  }
}

document.addEventListener("mousemove", updateCursorPosition);

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const nextButton = document.getElementById("next");
  const startWrapper = document.getElementById("start-wrapper");
  const eggs = document.querySelectorAll(".egg");
  const quesBox = document.getElementById("q");
  const scoreDisplay = document.getElementById("score");

  let shuffledRiskNames, shuffledRiskDefinitions;
  let score = 0;
  let currentIndex = 0;
  scoreDisplay.innerHTML = `<strong style="position: absolute; top: 12px; right: 25px; font-size: 25px">${score}</strong>`;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function updateScore(points) {
    if (gameOver) {

      return;
    }
    score += points;
    scoreDisplay.innerHTML = `<strong style="position: absolute; top: 12px; right: 25px; font-size: 25px">${score}</strong>`;
  }

  function showNextDefinition() {
    eggClicked = 0;
    onceOnly = 0;
    currentIndex++;
    if (currentIndex < shuffledRiskDefinitions.length) {
      quesBox.textContent = shuffledRiskDefinitions[currentIndex];
      shuffleArray(shuffledRiskNames);

      eggs.forEach((egg, index) => {
        egg.textContent = shuffledRiskNames[index];
      });
    } else {
      quesBox.textContent = "Game Over!";
      gameOver = 1;

      eggs.forEach((egg) => {
        egg.removeEventListener("click");
      });
    }
  }

  startButton.addEventListener("click", function () {
    startWrapper.classList.add("hidden");
    quesBox.style.display = "block";
    nextButton.style.display = "block";
    score = 0;
    scoreDisplay.innerHTML = `<strong style="position: absolute; top: 12px; right: 25px; font-size: 25px">${score}</strong>`;
    currentIndex = 0;

    shuffledRiskNames = [...riskNames];
    shuffledRiskDefinitions = [...riskDefinitions];
    shuffleArray(shuffledRiskNames);
    shuffleArray(shuffledRiskDefinitions);
    var brokenEgg;
    eggs.forEach((egg, index) => {
      egg.classList.add("show");
      egg.textContent = shuffledRiskNames[index];

      egg.addEventListener("click", function () {
        if(gameOver === 1){Break;}
        if (onceOnly == 0) {
          if (
            egg.textContent ===
            riskDefinitionsMap[shuffledRiskDefinitions[currentIndex]]
          ) {
            updateScore(5);
            corr_audio.volume = 0.1;
            corr_audio.play();
            onceOnly++;
            eggClicked = 1;
            egg.style.backgroundImage = "url('./assets/brokenEgg.png')";
            egg.textContent = "";
            egg.style.height = "75px";
            egg.style.width = "132px";
       

            var top = getComputedStyle(egg).top;

            var currentTop = parseFloat(top);

            var newTopNumeric = currentTop + 20;

            egg.style.top = newTopNumeric + "px";

            var left = getComputedStyle(egg).left;

            var currentLeft = parseFloat(left);

            var newLeftNumeric = currentLeft - 20;

            egg.style.left = newLeftNumeric + "px";

            brokenEgg = egg;
          } else {
            updateScore(-1);
            wrong_audio.volume = 0.05;
            wrong_audio.play();
            onceOnly++;
            eggClicked = 1;
            egg.style.backgroundImage = "url('./assets/brokenEgg.png')";
            egg.textContent = "";
            egg.style.height = "75px";
            egg.style.width = "132px";
       

            var top = getComputedStyle(egg).top;

            var currentTop = parseFloat(top);

            var newTopNumeric = currentTop + 20;

            egg.style.top = newTopNumeric + "px";

            var left = getComputedStyle(egg).left;

            var currentLeft = parseFloat(left);

            var newLeftNumeric = currentLeft - 20;

            egg.style.left = newLeftNumeric + "px";

            brokenEgg = egg;
          }
        }
      });
    });

    nextButton.addEventListener("click", function () {
        if(gameOver === 1){return;}
        
      if (gameOver !== 1 && eggClicked == 1) {
        brokenEgg.style.backgroundImage = "url('./assets/egg.png')";

        brokenEgg.style.height = "98px";
        brokenEgg.style.width = "85px";

        var top = getComputedStyle(brokenEgg).top;

        var currentTop = parseFloat(top);

        var newTopNumeric = currentTop - 20;

        brokenEgg.style.top = newTopNumeric + "px";

        var left = getComputedStyle(brokenEgg).left;

        var currentLeft = parseFloat(left);

        var newLeftNumeric = currentLeft +20;

        brokenEgg.style.left = newLeftNumeric + "px";
        showNextDefinition();
        

        
      }
      
      
      

      
    });

    quesBox.textContent = shuffledRiskDefinitions[currentIndex];
  });
});

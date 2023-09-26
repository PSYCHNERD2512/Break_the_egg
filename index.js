var parentVar = 'Points';

const riskNames = [
  ['Interest Rate Risk', 'Interest'],
  ['Credit Risk', 'Credit'],
  ['Equity Market Risk', 'Equity'],
  ['Currency Risk', 'Currency'],
  ['Commodity Risk', 'Commodity'],
  ['Liquidity Risk', 'Liquidity'],
  ['Volatility Risk', 'Volatility'],
];
var cor = 0;
const startButton = document.getElementById('start');

var onceOnly = 0;
var final = document.getElementById('final');

const riskDefinitionsMap = {
  'The potential for fluctuations in interest rates to impact the value of investments or financial instruments.':
    'Interest Rate Risk',
  "The risk of financial loss due to a borrower's inability to repay their debt obligations as agreed.":
    'Credit Risk',
  'The exposure to potential losses resulting from fluctuations in stock prices and broader market conditions.':
    'Equity Market Risk',
  'The risk of financial loss due to changes in exchange rates when investing in assets denominated in foreign currencies.':
    'Currency Risk',
  'The vulnerability to price fluctuations of commodities such as oil, metals, and agricultural products, impacts related investments.':
    'Commodity Risk',
  'The risk of being unable to quickly convert assets into cash without significant loss in value.':
    'Liquidity Risk',
  'The exposure to potential price instability and uncertainty, leading to unexpected changes in investment values.':
    'Volatility Risk',
};

const riskDefinitions = [
  'The potential for fluctuations in interest rates to impact the value of investments or financial instruments.',
  "The risk of financial loss due to a borrower's inability to repay their debt obligations as agreed.",
  'The exposure to potential losses resulting from fluctuations in stock prices and broader market conditions.',
  'The risk of financial loss due to changes in exchange rates when investing in assets denominated in foreign currencies.',
  'The vulnerability to price fluctuations of commodities such as oil, metals, and agricultural products, impacts related investments.',
  'The risk of being unable to quickly convert assets into cash without significant loss in value.',
  'The exposure to potential price instability and uncertainty, leading to unexpected changes in investment values.',
];
var eggClicked = 0;
var corr_audio = new Audio('./audio/correct.mp3');
var wrong_audio = new Audio('./audio/wrong.mp3');

var gameOver = 0;

const customCursor = document.createElement('img');
customCursor.src = './assets/cursor.png';
customCursor.style.position = 'absolute';
customCursor.style.pointerEvents = 'none';
customCursor.style.height = '150px';
customCursor.style.display = 'none';

document.body.appendChild(customCursor);

var gameStarted = false;

// For Storyboard
var player;
var initScore;

function updateCursorPosition(event) {
  if (gameStarted) {
    document.body.style.cursor = 'none';
    const isCursorOverStart = event.target.id.toLowerCase() === 'start';
    const isCursorOverNext = event.target.id.toLowerCase() === 'next';
    const isCursorOverNext2 = event.target.id.toLowerCase() === 'next2';

    customCursor.style.left =
      event.clientX - customCursor.width / 2 + 28 + 'px';
    customCursor.style.top =
      event.clientY - customCursor.height / 2 + 78 + 'px';

    if (isCursorOverStart || isCursorOverNext || isCursorOverNext2) {
      customCursor.style.display = 'none';
    } else {
      customCursor.style.display = 'block';
    }
  }
}

const nextButton = document.getElementById('next');
const next2Button = document.getElementById('next2');
var nextSen = document.getElementById('nextSen');
const startWrapper = document.getElementById('start-wrapper');
const eggs = document.querySelectorAll('.egg');
const quesBox = document.getElementById('q');
const ga = document.getElementById('ga');
const gb = document.getElementById('gb');
const gc = document.getElementById('gc');
const gd = document.getElementById('gd');
const ge = document.getElementById('ge');
const gl = document.getElementById('GL');
const gr = document.getElementById('GR');
const scoreDisplay = document.getElementById('score');
const pointer = document.getElementById('pointer');
const progress = document.getElementById('progress');
document.addEventListener('mousemove', updateCursorPosition);

document.addEventListener('DOMContentLoaded', function () {
  let shuffledRiskNames, shuffledRiskDefinitions;
  let score = 0;
  let currentIndex = 0;
  scoreDisplay.innerHTML = `<strong style="position: absolute; top: 12px; right: 25px; font-size: 25px">${score}</strong>`;

  if (window.parent && window.parent.GetPlayer) {
    player = window.parent.GetPlayer();
    if (player) {
      console.log('Get Var ', player.GetVar);
      console.log('Get Var score', player.GetVar(parentVar));
      initScore = player.GetVar(parentVar);
    }
  }

  function shuffleArray(array) {
    customCursor.style.display = 'none';
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
        egg.textContent = shuffledRiskNames[index][0];
        egg.style.color = 'transparent';

        egg.style.backgroundImage = `url('./assets/${shuffledRiskNames[index][1]}.png')`;
      });
    } else {
      progress.style.display = 'none';
      pointer.style.display = 'none';
      quesBox.textContent = 'Game Over!';

      eggs.forEach((egg) => {
        egg.removeEventListener('click');
      });
    }
  }

  startButton.addEventListener('click', function () {
    gameStarted = true;
    startWrapper.classList.add('hidden');
    quesBox.style.display = 'block';

    progress.style.display = 'block';
    pointer.style.display = 'block';
    score = 0;
    scoreDisplay.innerHTML = `<strong style="position: absolute; top: 12px; right: 25px; font-size: 25px">${score}</strong>`;
    currentIndex = 0;

    shuffledRiskNames = [...riskNames];
    shuffledRiskDefinitions = [...riskDefinitions];
    shuffleArray(shuffledRiskNames);
    shuffleArray(shuffledRiskDefinitions);
    var brokenEgg;

    eggs.forEach((egg, index) => {
      egg.classList.add('show');
      egg.textContent = shuffledRiskNames[index][0];
      egg.style.color = 'transparent';
      egg.style.backgroundImage = `url('./assets/${shuffledRiskNames[index][1]}.png')`;

      egg.addEventListener('click', function () {
        var minusone = document.getElementById('minusone');
        var five = document.getElementById('five');
        var threeStars = document.getElementById('threeStars');
        if (gameOver === 1) {
          Break;
        }
        if (onceOnly == 0) {
          if (
            egg.textContent ===
            riskDefinitionsMap[shuffledRiskDefinitions[currentIndex]]
          ) {
            cor = 1;
            updateScore(5);
            if (currentIndex < 6) nextButton.style.display = 'block';

            corr_audio.volume = 0.1;
            corr_audio.play();
            onceOnly++;
            eggClicked = 1;
            egg.style.backgroundImage = "url('./assets/brokenEgg.png')";
            egg.textContent = '';
            egg.style.height = '75px';
            egg.style.width = '132px';

            var top = getComputedStyle(egg).top;

            var currentTop = parseFloat(top);

            var newTopNumeric = currentTop + 20;

            egg.style.top = newTopNumeric + 'px';

            var left = getComputedStyle(egg).left;

            var currentLeft = parseFloat(left);

            var newLeftNumeric = currentLeft - 20;

            egg.style.left = newLeftNumeric + 'px';

            brokenEgg = egg;

            five.style.display = 'block';
            five.style.marginTop =
              parseFloat(getComputedStyle(brokenEgg).marginTop) + 'px';
            five.style.marginLeft =
              parseFloat(getComputedStyle(brokenEgg).marginLeft) + 40 + 'px';
            threeStars.style.display = 'block';
            threeStars.style.marginTop =
              parseFloat(getComputedStyle(brokenEgg).marginTop) - 45 + 'px';
            threeStars.style.marginLeft =
              parseFloat(getComputedStyle(brokenEgg).marginLeft) + 10 + 'px';
          } else {
            updateScore(-1);
            if (currentIndex < 6) nextButton.style.display = 'block';

            wrong_audio.volume = 0.05;
            wrong_audio.play();
            onceOnly++;
            eggClicked = 1;
            egg.style.backgroundImage = "url('./assets/brokenEgg.png')";
            egg.textContent = '';
            egg.style.height = '75px';
            egg.style.width = '132px';

            var top = getComputedStyle(egg).top;

            var currentTop = parseFloat(top);

            var newTopNumeric = currentTop + 20;

            egg.style.top = newTopNumeric + 'px';

            var left = getComputedStyle(egg).left;

            var currentLeft = parseFloat(left);

            var newLeftNumeric = currentLeft - 20;

            egg.style.left = newLeftNumeric + 'px';

            brokenEgg = egg;
            minusone.style.top =
              parseFloat(getComputedStyle(brokenEgg).top) + 'px';
            minusone.style.left =
              parseFloat(getComputedStyle(brokenEgg).left) + 'px';
            minusone.style.marginTop =
              parseFloat(getComputedStyle(brokenEgg).marginTop) - 40 + 'px';
            minusone.style.marginLeft =
              parseFloat(getComputedStyle(brokenEgg).marginLeft) + 60 + 'px';
            minusone.style.display = 'block';
          }
          if (currentIndex === shuffledRiskDefinitions.length - 1) {
            var leftP = getComputedStyle(pointer).left;

            var currentLeftP = parseFloat(leftP);
            var t;

            if (currentIndex == 6) {
              t = 35;
            }
            var newLeftNumericP = currentLeftP + t;
            pointer.style.left = newLeftNumericP + 'px';
            if (cor == 1) {
              gr.style.display = 'block';
            }

            eggs.forEach((egg, index) => {
              egg.style.display = 'none';
            });
            pointer.style.display = 'none';
            final.style.display = 'block';
            nextSen.style.display = 'block';

            quesBox.style.display = 'none';
            minusone.style.display = 'none';
            five.style.display = 'none';
            threeStars.style.display = 'none';

            nextButton.style.display = 'none';
            next2Button.style.display = 'block';

            // Update score to storyboard
            if (player) {
              player.SetVar(parentVar, score);
            }
          }
        }
      });
    });

    nextButton.addEventListener('click', function () {
      minusone.style.display = 'none';
      five.style.display = 'none';
      threeStars.style.display = 'none';

      brokenEgg.style.backgroundImage = "url('./assets/egg.png')";

      brokenEgg.style.height = '98px';
      brokenEgg.style.width = '85px';

      var top = getComputedStyle(brokenEgg).top;

      var currentTop = parseFloat(top);

      var newTopNumeric = currentTop - 20;

      brokenEgg.style.top = newTopNumeric + 'px';

      var left = getComputedStyle(brokenEgg).left;

      var currentLeft = parseFloat(left);

      var newLeftNumeric = currentLeft + 20;
      if (cor == 1) {
        switch (currentIndex) {
          case 0:
            gl.style.display = 'block';
            break;
          case 1:
            ga.style.display = 'block';
            break;
          case 2:
            gb.style.display = 'block';
            break;
          case 3:
            gc.style.display = 'block';
            break;
          case 4:
            gd.style.display = 'block';
            break;
          case 5:
            ge.style.display = 'block';
            break;
          case 6:
            gr.style.display = 'block';
            break;
        }
      }

      cor = 0;

      var leftP = getComputedStyle(pointer).left;

      var currentLeftP = parseFloat(leftP);
      var t;
      if (currentIndex == 0) {
        t = 29.4;
      } else if (currentIndex == 1) {
        t = 33;
      } else if (
        currentIndex == 2 ||
        currentIndex == 3 ||
        currentIndex == 4 ||
        currentIndex == 5 ||
        currentIndex == 6
      ) {
        t = 35;
      }

      var newLeftNumericP = currentLeftP + t;
      if (score === 1 && currentIndex == 1) {
      }

      pointer.style.left = newLeftNumericP + 'px';

      brokenEgg.style.left = newLeftNumeric + 'px';
      nextButton.style.display = 'none';

      showNextDefinition();
    });

    quesBox.textContent = shuffledRiskDefinitions[currentIndex];
  });
});

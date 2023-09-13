const riskNames = [
    "Interest Rate Risk",
    "Credit Risk",
    "Equity Market Risk",
    "Currency Risk",
    "Commodity Risk",
    "Liquidity Risk",
    "Volatility Risk"
];

const riskDefinitionsMap = {
    "The potential for fluctuations in interest rates to impact the value of investments or financial instruments.": "Interest Rate Risk",
    "The risk of financial loss due to a borrower's inability to repay their debt obligations as agreed.": "Credit Risk",
    "The exposure to potential losses resulting from fluctuations in stock prices and broader market conditions.": "Equity Market Risk",
    "The risk of financial loss due to changes in exchange rates when investing in assets denominated in foreign currencies.": "Currency Risk",
    "The vulnerability to price fluctuations of commodities such as oil, metals, and agricultural products, impacts related investments.": "Commodity Risk",
    "The risk of being unable to quickly convert assets into cash without significant loss in value.": "Liquidity Risk",
    "The exposure to potential price instability and uncertainty, leading to unexpected changes in investment values.": "Volatility Risk"
};

const riskDefinitions = [
    "The potential for fluctuations in interest rates to impact the value of investments or financial instruments.",
    "The risk of financial loss due to a borrower's inability to repay their debt obligations as agreed.",
    "The exposure to potential losses resulting from fluctuations in stock prices and broader market conditions.",
    "The risk of financial loss due to changes in exchange rates when investing in assets denominated in foreign currencies.",
    "The vulnerability to price fluctuations of commodities such as oil, metals, and agricultural products, impacts related investments.",
    "The risk of being unable to quickly convert assets into cash without significant loss in value.",
    "The exposure to potential price instability and uncertainty, leading to unexpected changes in investment values."
];

var gameOver = false;

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const startWrapper = document.getElementById("start-wrapper");
    const eggs = document.querySelectorAll(".egg");
    const quesBox = document.getElementById("q");
    const scoreDisplay = document.getElementById("score");

    let shuffledRiskNames, shuffledRiskDefinitions;
    let score = 0;
    let currentIndex = 0;

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
        currentIndex++;
        if (currentIndex < shuffledRiskDefinitions.length) {
            quesBox.textContent = shuffledRiskDefinitions[currentIndex];
            shuffleArray(shuffledRiskNames);

            eggs.forEach((egg, index) => {
                egg.textContent = shuffledRiskNames[index];
            });
        } else {
            quesBox.textContent = "Game Over!";
            gameOver = true;

            eggs.forEach((egg) => {
                egg.removeEventListener("click");
            });
        }
    }

    startButton.addEventListener("click", function () {
        startWrapper.classList.add("hidden");
        quesBox.style.display = "block";
        score = 0;
        scoreDisplay.innerHTML = `<strong style="position: absolute; top: 12px; right: 25px; font-size: 25px">${score}</strong>`;
        currentIndex = 0;

        shuffledRiskNames = [...riskNames];
        shuffledRiskDefinitions = [...riskDefinitions];
        shuffleArray(shuffledRiskNames);
        shuffleArray(shuffledRiskDefinitions);

        eggs.forEach((egg, index) => {
            egg.classList.add("show");
            egg.textContent = shuffledRiskNames[index];

            egg.addEventListener("click", function () {
                if (egg.textContent === riskDefinitionsMap[shuffledRiskDefinitions[currentIndex]]) {
                    updateScore(5);
                } else {
                    updateScore(-1);
                }
                showNextDefinition();
            });
        });

        quesBox.textContent = shuffledRiskDefinitions[currentIndex];
    });
});

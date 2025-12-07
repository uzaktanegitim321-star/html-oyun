let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timerId = null;

const ball = document.getElementById("ball");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const bestText = document.getElementById("best");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const gameArea = document.querySelector(".game-area");

// Eski rekoru localStorage'dan al
let bestScore = Number(localStorage.getItem("bestScore") || 0);
bestText.textContent = bestScore;

function moveBall() {
    if (!gameRunning) return;
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const ballSize = 60; // css'te de 60px

    const maxX = areaWidth - ballSize;
    const maxY = areaHeight - ballSize;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    ball.style.left = x + "px";
    ball.style.top = y + "px";
}

function startGame() {
    score = 0;
    timeLeft = 30;
    gameRunning = true;
    scoreText.textContent = score;
    timeText.textContent = timeLeft;
    statusText.textContent = "";

    if (timerId) {
        clearInterval(timerId);
    }

    moveBall();

    timerId = setInterval(() => {
        timeLeft--;
        timeText.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;
    clearInterval(timerId);
    statusText.textContent = "Süre bitti! Skorun: " + score;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        bestText.textContent = bestScore;
        statusText.textContent += "  🎉 Yeni rekor!";
    }
}

ball.addEventListener("click", () => {
    if (!gameRunning) return;
    score++;
    scoreText.textContent = score;
    moveBall();
});

startBtn.addEventListener("click", startGame);

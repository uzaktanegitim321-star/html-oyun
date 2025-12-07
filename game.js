let score = 0;
const ball = document.getElementById("ball");
const scoreText = document.getElementById("score");

ball.addEventListener("click", () => {
    score++;
    scoreText.textContent = score;

    // Top rastgele bir yere gider
    ball.style.top = Math.random() * 300 + "px";
    ball.style.left = Math.random() * 300 + "px";
});

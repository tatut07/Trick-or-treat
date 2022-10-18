const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".splash-screen");
const startButton = document.getElementById("startButton");
const gameLogo = document.getElementById("gameLogo");
const scoreImg = document.getElementById("gameScore");
const restartButton = document.getElementById("restartButton");

// const background = new Image();
// background.src = "./images/background1.jpg";
const basket = new Image();
basket.src = "./Images/basket.svg";
const scoreBackground = new Image();
scoreBackground.src = "./Images/score.svg";
const candy1 = new Image();
candy1.src = "./Images/candy1.svg";
const candy2 = new Image();
candy2.src = "./images/candy2.svg";
const candy3 = new Image();
candy3.src = "./images/candy3.svg";
const candy4 = new Image();
candy4.src = "./images/candy4.svg";
const candy5 = new Image();
candy5.src = "./images/candy5.svg";
const candy6 = new Image();
candy6.src = "./images/candy6.svg";
const rottenApple = new Image();
rottenApple.src = "./images/rottenapple.svg";

const basketHeight = 120;
const basketWidth = 160;
let basketX = 150;
let basketY = 470;
let movingRight = false;
let movingLeft = false;
const obstacleWidth = 40;
const obstacleHeight = 50;

let isGameOver = false;
let gameId = 0;

let score = 0;

let candyArr = [
  { x: obstaclesRandom(), y: -200, points: 5, img: candy1 },
  { x: obstaclesRandom(), y: -900, points: 5, img: candy2 },
  { x: obstaclesRandom(), y: -100, points: 10, img: candy3 },
  { x: obstaclesRandom(), y: -700, points: 10, img: candy4 },
  { x: obstaclesRandom(), y: -1200, points: 15, img: candy5 },
  { x: obstaclesRandom(), y: -2000, points: 15, img: candy6 },
  { x: obstaclesRandom(), y: -2000, points: 0, img: rottenApple },
];

function obstaclesRandom() {
  return Math.random() * (canvas.width - obstacleWidth);
}

window.onload = () => {
  canvas.style.display = "none";
  scoreImg.style.display = "none";
  restartButton.style.display = "none";
  startButton.onclick = () => {
    console.log("starting");
    startGame();
  };
};

function drawScore() {
  ctx.font = "28px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(score, 385, 30);
}

const animate = () => {
  ctx.clearRect(0, 0, 450, 600);
  ctx.drawImage(scoreBackground, 300, 0, 150, 40);
  drawScore();
  ctx.drawImage(basket, basketX, basketY, basketWidth, basketHeight);
  if (movingRight === true) {
    basketX += 2;
  } else if (movingLeft === true) {
    basketX -= 2;
  }

  for (let i = 0; i < candyArr.length; i++) {
    let current = candyArr[i];
    ctx.drawImage(
      current.img,
      current.x,
      current.y,
      obstacleWidth,
      obstacleHeight
    );
    current.y += 3;
    if (current.y > canvas.height) {
      current.y = -300;
      current.x = obstaclesRandom();
    }
    if (
      basketX < current.x + obstacleWidth &&
      basketX + basketWidth > current.x &&
      basketY < current.y + obstacleHeight &&
      basketY + basketHeight > current.y
    ) {
      if (current.points !== 0) {
        score += current.points;
        current.y = -300;
        current.x = obstaclesRandom();
        console.log(score);
      } else {
        isGameOver = true;
      }
    }
  }

  if (isGameOver) {
    gameOver();
  } else {
    gameId = requestAnimationFrame(animate);
  }
};

function startGame() {
  canvas.style.display = "block";
  gameLogo.style.display = "none";
  startButton.style.display = "none";
  scoreImg.style.display = "block";
  animate();

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      movingRight = true;
    } else if (event.code === "ArrowLeft") {
      movingLeft = true;
    }
  });
  document.addEventListener("keyup", () => {
    movingRight = false;
    movingLeft = false;
  });
}

function gameOver() {
  ctx.clearRect(0, 0, 450, 600);
  restartButton.style.display = "block";
  canvas.style.display = "none";
  scoreImg.style.display = "none";
  cancelAnimationFrame(gameId);
  restartButton.onclick = () => {
    startGame();
  };
}

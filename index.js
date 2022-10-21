const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".splashScreen");
const startButton = document.getElementById("startButton");
const gameLogo = document.getElementById("gameLogo");
const scoreImg2 = document.getElementById("gameScore2");
const scoreNumbers2 = document.getElementById("scoreVariable2");
const gameOverImg = document.getElementById("gameOverImg");
const restartButton = document.getElementById("restartButton");
const gameOverScreen = document.getElementById("gameOver");

/*Backgrounds canvas*/
const canvasBackground = new Image();
canvasBackground.src = "./Images/background1.jpg";
const scoreBackground = new Image();
scoreBackground.src = "./Images/score.svg";

/*Player*/
const basket = new Image();
basket.src = "./Images/basket.svg";

/*Objects*/
const candy1 = new Image();
candy1.src = "./Images/candy1.svg";
const candy2 = new Image();
candy2.src = "./Images/candy2.svg";
const candy3 = new Image();
candy3.src = "./Images/candy3.svg";
const candy4 = new Image();
candy4.src = "./Images/candy4.svg";
const candy5 = new Image();
candy5.src = "./Images/candy5.svg";
const candy6 = new Image();
candy6.src = "./Images/candy6.svg";
const badCandy = new Image();
badCandy.src = "./Images/candybad.svg";

/*Sounds*/
const soundBasket = new Audio("./Sounds/shufflingBasket.mp3");
soundBasket.volume = 0.1;
const soundCandy = new Audio("./Sounds/getCandy.mp3");
soundCandy.volume = 0.1;
const soundGameOver = new Audio("./Sounds/gameOver.mp3");
soundGameOver.volume = 0.1;
const soundBackground = new Audio("./Sounds/Magic.mp3");
soundBackground.volume = 0.1;

const basketHeight = 80;
const basketWidth = 130;
let basketX = 180;
let basketY = 550;
let movingRight = false;
let movingLeft = false;
const obstacleWidth = 30;
const obstacleHeight = 40;

let isGameOver = false;
let gameId = 0;

let score = 0;
let speed = 3;

let candyArr = [
  { x: obstaclesRandom(), y: -200, points: 5, img: candy1 },
  { x: obstaclesRandom(), y: -900, points: 5, img: candy2 },
  { x: obstaclesRandom(), y: -100, points: 10, img: candy3 },
  { x: obstaclesRandom(), y: -700, points: 10, img: candy4 },
  { x: obstaclesRandom(), y: -1200, points: 15, img: candy5 },
  { x: obstaclesRandom(), y: -2000, points: 15, img: candy6 },
  { x: obstaclesRandom(), y: -100, points: 0, img: badCandy },
];

function obstaclesRandom() {
  return Math.random() * (canvas.width - obstacleWidth);
}

window.onload = () => {
  soundBackground.play();
  startScreen.style.display = "block";
  gameOverScreen.style.display = "none";
  canvas.style.display = "none";
  startButton.onclick = () => {
    console.log("starting");
    startGame();
  };
};

function drawScore() {
  ctx.font = "28px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(score, 270, 50);
}

const animate = () => {
  ctx.clearRect(0, 0, 450, 600);
  ctx.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(scoreBackground, 150, 20, 200, 40);
  ctx.drawImage(basket, basketX, basketY, basketWidth, basketHeight);
  if (movingRight === true && basketX < 370) {
    basketX += 2;
  } else if (movingLeft === true && basketX > 0) {
    basketX -= 2;
  }

  drawScore();

  for (let i = 0; i < candyArr.length; i++) {
    let current = candyArr[i];
    ctx.drawImage(
      current.img,
      current.x,
      current.y,
      obstacleWidth,
      obstacleHeight
    );
    current.y += speed;
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
        scoreNumbers2.innerHTML = score;
        current.y = -300;
        current.x = obstaclesRandom();
        soundCandy.play();
        console.log(score);
      } else {
        soundGameOver.play();
        isGameOver = true;
      }
    }
  }
  if (score > 50) {
    speed = 4;
  } else if (score > 100) {
    speed = 5;
  } else if (score > 250) {
    speed = 6;
  } else if (score > 500) {
    speed = 7;
  } else if (score > 800) {
    speed = 8;
  }
  if (isGameOver) {
    gameOver();
  } else {
    gameId = requestAnimationFrame(animate);
  }
};

function startGame() {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  gameLogo.style.display = "none";
  startButton.style.display = "none";
  restartButton.style.display = "none";
  gameOverScreen.style.display = "none";
  gameOverImg.style.display = "none";
  animate();

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      movingRight = true;
      soundBasket.play();
    } else if (event.code === "ArrowLeft") {
      movingLeft = true;
      soundBasket.play();
    }
  });
  document.addEventListener("keyup", () => {
    movingRight = false;
    movingLeft = false;
  });
}

function gameOver() {
  cancelAnimationFrame(gameId);
  ctx.clearRect(0, 0, 450, 600);
  gameOverScreen.style.display = "block";
  gameOverImg.style.display = "block";
  restartButton.style.display = "block";
  scoreImg2.style.display = "block";
  scoreNumbers2.style.display = "block";
  canvas.style.display = "none";
  restartButton.onclick = () => {
    isGameOver = false;
    candyArr = [
      { x: obstaclesRandom(), y: -200, points: 5, img: candy1 },
      { x: obstaclesRandom(), y: -900, points: 5, img: candy2 },
      { x: obstaclesRandom(), y: -100, points: 10, img: candy3 },
      { x: obstaclesRandom(), y: -700, points: 10, img: candy4 },
      { x: obstaclesRandom(), y: -1200, points: 15, img: candy5 },
      { x: obstaclesRandom(), y: -2000, points: 15, img: candy6 },
      { x: obstaclesRandom(), y: -100, points: 0, img: badCandy },
    ];
    score = 0;
    startGame();
  };
}

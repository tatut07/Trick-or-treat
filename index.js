const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".splash-screen");
const startButton = document.getElementById("startButton");
const gameLogo = document.getElementById("gameLogo");

// const background = new Image();
// background.src = "./images/background1.jpg";
const basket = new Image();
basket.src = "./Images/basket.svg";
const score = new Image();
score.src = "./Images/score.svg";
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

const basketHeight = 400;
const basketWidth = 300;
let basketX = 85;
let basketY = 350;
let movingRight = false;
let movingLeft = false;
const obstacleWidth = 100;
const obstacleHeight = 150;

let isGameOver = false;
let gameId = 0;

//Objects Variables
let candyArr = [
  { x: obstaclesRandom(), y: 200, points: 50, img: candy1 },
  { x: obstaclesRandom(), y: -900, points: 50, img: candy2 },
  { x: obstaclesRandom(), y: -100, points: 100, img: candy3 },
  { x: obstaclesRandom(), y: -700, points: 100, img: candy4 },
  { x: obstaclesRandom(), y: -1200, points: 150, img: candy5 },
  { x: obstaclesRandom(), y: -2000, points: 150, img: candy6 },
  { x: obstaclesRandom(), y: -2000, img: rottenApple },
];

function obstaclesRandom() {
  return Math.random() * (canvas.width - obstacleWidth);
}

window.onload = () => {
  canvas.style.display = "none";
  startButton.onclick = () => {
    console.log("starting");
    startGame();
  };
};

const animate = () => {
  ctx.clearRect(0, 0, 450, 600);
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
  }

  if (isGameOver) {
    cancelAnimationFrame(gameId);
  } else {
    gameId = requestAnimationFrame(animate);
  }
};

function startGame() {
  canvas.style.display = "block";
  gameLogo.style.display = "none";
  startButton.style.display = "none";
  animate();

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      console.log("We are going right!");
      movingRight = true;
    } else if (event.code === "ArrowLeft") {
      console.log("We are going left!");
      movingLeft = true;
    }
  });
  document.addEventListener("keyup", () => {
    movingRight = false;
    movingLeft = false;
  });
}

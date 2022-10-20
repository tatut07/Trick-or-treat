const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("gameBackground");
const startButton = document.getElementById("startButton");
const gameLogo = document.getElementById("gameLogo");
const scoreImg = document.getElementById("gameScore");
const scoreNumbers = document.getElementById("scoreVariable");
const gameOverImg = document.getElementById("gameOverImg");
const restartButton = document.getElementById("restartButton");
const restartScreen = document.getElementById("restartgameBackground");

const basket = new Image();
basket.src = "./Images/basket.svg";
const scoreBackground = new Image();
scoreBackground.src = "./Images/score.svg";
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
const rottenApple = new Image();
rottenApple.src = "./Images/rottenapple.svg";
const soundBasket = new Audio("./Sounds/shufflingBasket.mp3");
soundBasket.volume = 0.1;
const soundCandy = new Audio("./Sounds/getCandy.mp3");
soundCandy.volume = 0.1;
const soundGameOver = new Audio("./Sounds/gameOver.mp3");
soundGameOver.volume = 0.1;
const soundBackground = new Audio("./Sounds/Magic.mp3");
soundBackground.volume = 0.1;

const basketHeight = 120;
const basketWidth = 160;
let basketX = 155;
let basketY = 470;
let movingRight = false;
let movingLeft = false;
const obstacleWidth = 40;
const obstacleHeight = 50;

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
  { x: obstaclesRandom(), y: -100, points: 0, img: rottenApple },
];

function obstaclesRandom() {
  return Math.random() * (canvas.width - obstacleWidth);
}

window.onload = () => {
  // soundBackground.play();
  startScreen.style.display = "block";
  restartScreen.style.display = "none";
  canvas.style.display = "none";
  scoreImg.style.display = "none";
  gameOverImg.style.display = "none";
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
        scoreNumbers.innerHTML = score;
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
  startScreen.style.display = "block";
  scoreImg.style.display = "block";
  canvas.style.display = "block";
  gameLogo.style.display = "none";
  startButton.style.display = "none";
  restartButton.style.display = "none";
  restartScreen.style.display = "none";
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
  gameOverImg.style.display = "block";
  restartButton.style.display = "block";
  scoreImg.style.display = "block";
  // scoreNumbers.style.display = "block";
  canvas.style.display = "none";
  startScreen.style.display = "none";
  restartButton.onclick = () => {
    isGameOver = false;
    candyArr = [
      { x: obstaclesRandom(), y: -200, points: 5, img: candy1 },
      { x: obstaclesRandom(), y: -900, points: 5, img: candy2 },
      { x: obstaclesRandom(), y: -100, points: 10, img: candy3 },
      { x: obstaclesRandom(), y: -700, points: 10, img: candy4 },
      { x: obstaclesRandom(), y: -1200, points: 15, img: candy5 },
      { x: obstaclesRandom(), y: -2000, points: 15, img: candy6 },
      { x: obstaclesRandom(), y: -100, points: 0, img: rottenApple },
    ];
    score = 0;
    startGame();
  };
}

// const basket = new Image();
// basket.src = "./Images/basket.svg";
// const scoreBackground = new Image();
// scoreBackground.src = "./Images/score.svg";
// const candy1 = new Image();
// candy1.src = "./Images/candy1.svg";
// const candy2 = new Image();
// candy2.src = "./Images/candy2.svg";
// const candy3 = new Image();
// candy3.src = "./Images/candy3.svg";
// const candy4 = new Image();
// candy4.src = "./Images/candy4.svg";
// const candy5 = new Image();
// candy5.src = "./Images/candy5.svg";
// const candy6 = new Image();
// candy6.src = "./Images/candy6.svg";
// const rottenApple = new Image();
// rottenApple.src = "./Images/rottenapple.svg";
// const soundBasket = new Audio("./Sounds/shufflingBasket.mp3");
// soundBasket.volume = 0.1;
// const soundCandy = new Audio("./Sounds/getCandy.mp3");
// soundCandy.volume = 0.1;
// const soundGameOver = new Audio("./Sounds/gameOver.mp3");
// soundGameOver.volume = 0.1;
// const soundBackground = new Audio("./Sounds/Magic.mp3");
// soundBackground.volume = 0.1;

// const basketHeight = 120;
// const basketWidth = 160;
// let basketX = 155;
// let basketY = 470;
// let movingRight = false;
// let movingLeft = false;
// const obstacleWidth = 40;
// const obstacleHeight = 50;

// let isGameOver = false;
// let gameId = 0;

// let score = 0;
// let speed = 3;

// let candyArr = [
//   { x: obstaclesRandom(), y: -200, points: 5, img: candy1 },
//   { x: obstaclesRandom(), y: -900, points: 5, img: candy2 },
//   { x: obstaclesRandom(), y: -100, points: 10, img: candy3 },
//   { x: obstaclesRandom(), y: -700, points: 10, img: candy4 },
//   { x: obstaclesRandom(), y: -1200, points: 15, img: candy5 },
//   { x: obstaclesRandom(), y: -2000, points: 15, img: candy6 },
//   { x: obstaclesRandom(), y: -100, points: 0, img: rottenApple },
// ];

// function obstaclesRandom() {
//   return Math.random() * (canvas.width - obstacleWidth);
// }

// window.onload = () => {
//   // soundBackground.play();
//   splashScreenBack.style.display = "block";
//   playGameScreenBack.style.display = "none";
//   gameOverScreenBack.style.visibility = "hidden";
//   canvas.style.display = "none";
//   // scoreImg.style.display = "none";
//   // gameOverImg.style.display = "none";
//   startButton.onclick = () => {
//     console.log("starting");
//     startGame();
//   };
// };

// const animate = () => {
//   ctx.clearRect(0, 0, 450, 600);
//   ctx.drawImage(basket, basketX, basketY, basketWidth, basketHeight);
//   if (movingRight === true) {
//     basketX += 2;
//   } else if (movingLeft === true) {
//     basketX -= 2;
//   }

//   for (let i = 0; i < candyArr.length; i++) {
//     let current = candyArr[i];
//     ctx.drawImage(
//       current.img,
//       current.x,
//       current.y,
//       obstacleWidth,
//       obstacleHeight
//     );
//     current.y += speed;
//     if (current.y > canvas.height) {
//       current.y = -300;
//       current.x = obstaclesRandom();
//     }
//     if (
//       basketX < current.x + obstacleWidth &&
//       basketX + basketWidth > current.x &&
//       basketY < current.y + obstacleHeight &&
//       basketY + basketHeight > current.y
//     ) {
//       if (current.points !== 0) {
//         score += current.points;
//         scoreNumbers.innerHTML = score;
//         current.y = -300;
//         current.x = obstaclesRandom();
//         soundCandy.play();
//         console.log(score);
//       } else {
//         soundGameOver.play();
//         isGameOver = true;
//       }
//     }
//   }
//   if (score > 50) {
//     speed = 4;
//   } else if (score > 100) {
//     speed = 5;
//   } else if (score > 250) {
//     speed = 6;
//   } else if (score > 500) {
//     speed = 7;
//   } else if (score > 800) {
//     speed = 8;
//   }
//   if (isGameOver) {
//     gameOver();
//   } else {
//     gameId = requestAnimationFrame(animate);
//   }
// };

// function startGame() {
//   playGameScreenBack.style.display = "block";
//   canvas.style.display = "block";
//   splashScreenBack.style.visibility = "hidden";
//   gameOverScreenBack.style.visibility = "hidden";
//   // scoreImg.style.display = "block";
//   gameLogo.style.display = "none";
//   startButton.style.display = "none";
//   // restartButton.style.display = "none";
//   // restartScreen.style.display = "none";
//   // gameOverImg.style.display = "none";
//   animate();

//   document.addEventListener("keydown", (event) => {
//     if (event.code === "ArrowRight") {
//       movingRight = true;
//       soundBasket.play();
//     } else if (event.code === "ArrowLeft") {
//       movingLeft = true;
//       soundBasket.play();
//     }
//   });
//   document.addEventListener("keyup", () => {
//     movingRight = false;
//     movingLeft = false;
//   });
// }

// function gameOver() {
//   cancelAnimationFrame(gameId);
//   ctx.clearRect(0, 0, 450, 600);
//   gameOverScreenBack.style.display = "block";
//   // gameOverImg.style.display = "block";
//   // restartButton.style.display = "block";
//   // scoreImg.style.display = "block";
//   // scoreNumbers.style.display = "block";
//   canvas.style.display = "none";
//   splashScreenBack.style.display = "none";
//   playGameScreenBack.style.display = "none";
//   // restartButton.onclick = () => {
//   //   isGameOver = false;
//   //   candyArr = [
//   //     { x: obstaclesRandom(), y: -200, points: 5, img: candy1 },
//   //     { x: obstaclesRandom(), y: -900, points: 5, img: candy2 },
//   //     { x: obstaclesRandom(), y: -100, points: 10, img: candy3 },
//   //     { x: obstaclesRandom(), y: -700, points: 10, img: candy4 },
//   //     { x: obstaclesRandom(), y: -1200, points: 15, img: candy5 },
//   //     { x: obstaclesRandom(), y: -2000, points: 15, img: candy6 },
//   //     { x: obstaclesRandom(), y: -100, points: 0, img: rottenApple },
//   //   ];
//   //   score = 0;
//   //   scoreNumbers.innerHTML = score;
//   //   startGame();
//   // };
// }

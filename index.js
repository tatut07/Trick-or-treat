document.getElementById(".splashScreen").style.display = "none";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".splash-screen");

// const background = new Image();
// background.src = "./images/background1.jpg";

// let isGameOver = false;
// let gameId = 0;

// const animate = () => {
//   ctx.drawImage(background1, 0, 0, canvas.width, canvas.height);
// };

window.onload = () => {
  document.getElementById("startButton").onclick = () => {
    console.log("starting");
    startGame();
  };
};
function startGame() {
  startScreen.style.display = "none";
  //   animate();
}

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
let lastTime = performance.now();
let FPS: number;
document.title = gameName;

const header = document.createElement("h1");
const clicker = document.createElement("button");
const buttonContainer = document.createElement("div");
const scoreContainer = document.createElement("div");
const scoreText = document.createElement("p");
const FPSText = document.createElement("p");

clicker.innerHTML = "⚾";
header.innerHTML = gameName;
let score: number = 0;

// clicker functionality
clicker.addEventListener("click", () => {
  score++;
});

requestAnimationFrame(incrementScore);
requestAnimationFrame(updateScore);

function incrementScore() {
  score += (performance.now() - lastTime) / 1000;
  FPS = 1000 / (performance.now() - lastTime);

  lastTime = performance.now();
  requestAnimationFrame(incrementScore);
}

// assembling page
app.append(header);
app.append(buttonContainer);
buttonContainer.append(clicker);
app.append(scoreContainer);
scoreContainer.append(scoreText);
scoreContainer.append(FPSText);

function updateScore() {
  scoreText.innerHTML = `Score: ${score.toFixed(3)}`;
  FPSText.innerHTML = `FPS: ${FPS.toFixed(0)}`;
  requestAnimationFrame(updateScore);
}

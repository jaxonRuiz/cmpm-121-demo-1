import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
let lastTime = performance.now();
let FPS: number;
document.title = gameName;

// creating page elements
const header = document.createElement("h1");
const clicker = document.createElement("button");
const buttonContainer = document.createElement("div");
const scoreContainer = document.createElement("div");
const scoreText = document.createElement("p");
const FPSText = document.createElement("p");

clicker.innerHTML = "⚾";
header.innerHTML = gameName;

// assembling page
app.append(header);
app.append(buttonContainer);
buttonContainer.append(clicker);
app.append(scoreContainer);
scoreContainer.append(scoreText);
scoreContainer.append(FPSText);

// start main update loop
requestAnimationFrame(update);

// update loop
function update() {
  incrementScore();

  FPS = 1000 / deltaTime(); // 1000ms = 1s
  scoreText.innerHTML = `Score: ${score.toFixed(3)}`;
  FPSText.innerHTML = `FPS: ${FPS.toFixed(0)}`;
  lastTime = performance.now();
  requestAnimationFrame(update);
}

// returns difference in time since last update
function deltaTime() {
  return performance.now() - lastTime;
}

// ========= Game Logic =========
let score: number = 0;

// clicker functionality
clicker.addEventListener("click", () => {
  score++;
});

// increments score fractionally by a set rate/second
function incrementScore(rate: number = 1) {
  score += (rate * deltaTime()) / 1000;
}

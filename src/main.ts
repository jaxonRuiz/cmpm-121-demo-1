import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
let lastTime = performance.now();
document.title = gameName;

const header = document.createElement("h1");
const clicker = document.createElement("button");
const buttonContainer = document.createElement("div");
const scoreContainer = document.createElement("div");

clicker.innerHTML = "⚾";
header.innerHTML = gameName;
scoreContainer.innerHTML = "Score: 0";
let score: number = 0;

// clicker functionality
clicker.addEventListener("click", () => {
  score++;
});

requestAnimationFrame(incrementScore);
requestAnimationFrame(updateScore);

function incrementScore() {
  score += (performance.now() - lastTime) / 1000;
  // scoreContainer.innerHTML = `Score: ${score}`;

  lastTime = performance.now();
  requestAnimationFrame(incrementScore);
}

// assembling page
app.append(header);
app.append(buttonContainer);
buttonContainer.append(clicker);
app.append(scoreContainer);

function updateScore() {
  scoreContainer.innerHTML = `Score: ${score.toFixed(3)}`;
  requestAnimationFrame(updateScore);
}

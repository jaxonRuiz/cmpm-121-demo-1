import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
let lastTime = performance.now();
let FPS: number;
document.title = gameName;

// creating page elements
const header = document.createElement("h1");
const clicker = document.createElement("button");
const autoclickerUpgrade = document.createElement("button");
const buttonContainer = document.createElement("div");
const scoreContainer = document.createElement("div");
const scoreText = document.createElement("p");
const FPSText = document.createElement("p");

clicker.innerHTML = "⚾";
autoclickerUpgrade.innerHTML = "Buy autoclicker (10)";
header.innerHTML = gameName;

// assembling page
app.append(header);
app.append(buttonContainer);
buttonContainer.append(clicker);
buttonContainer.append(autoclickerUpgrade);
app.append(scoreContainer);
scoreContainer.append(scoreText);
scoreContainer.append(FPSText);

// start main update loop
requestAnimationFrame(update);

// update loop
function update() {
  incrementScore();
  updateText();
  if (score < 10) autoclickerUpgrade.disabled = true;
  else autoclickerUpgrade.disabled = false;

  // end update
  lastTime = performance.now();
  requestAnimationFrame(update);

  function updateText() {
    scoreText.innerHTML = `Score: ${score.toFixed(3)}`;
    FPS = 1000 / deltaTime(); // 1000ms = 1s
    FPSText.innerHTML = `FPS: ${FPS.toFixed(0)}`;
  }

  function incrementScore() {
    score += (automaticRate * deltaTime()) / 1000;
  }
}

// returns difference in time since last update
function deltaTime() {
  return performance.now() - lastTime;
}

// ========= Game Logic =========
let score: number = 0;
let automaticRate: number = 0;
const autoclickerCost: number = 10;

// clicker functionality
clicker.addEventListener("click", () => {
  score++;
});

// autoclicker upgrade button
autoclickerUpgrade.innerHTML = `Buy autoclicker (${autoclickerCost})`;
autoclickerUpgrade.addEventListener("click", () => {
  score -= autoclickerCost;
  autoclickerUpgrade.innerHTML = `Autoclicker lvl ${automaticRate + 1} (${autoclickerCost})`;
  automaticRate++;
});

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
let lastTime = performance.now();
let FPS: number;
document.title = gameName;

// creating page elements
const header = document.createElement("h1");
const clicker = document.createElement("button");
const upgradeA = document.createElement("button");
const upgradeB = document.createElement("button");
const upgradeC = document.createElement("button");
const buttonContainer = document.createElement("div");
const textContainer = document.createElement("div");
const scoreText = document.createElement("p");
const rateText = document.createElement("p");
const FPSText = document.createElement("p");

clicker.innerHTML = "⚾";
upgradeA.innerHTML = "Buy autoclicker (10)";
header.innerHTML = gameName;

// assembling page
app.append(header);
app.append(buttonContainer);
buttonContainer.append(clicker);
buttonContainer.append(upgradeA);
buttonContainer.append(upgradeB);
buttonContainer.append(upgradeC);
app.append(textContainer);
textContainer.append(scoreText);
textContainer.append(rateText);
textContainer.append(FPSText);

// start main update loop
requestAnimationFrame(update);

// update loop
function update() {
  incrementScore();
  updateText();
  buttonConditions();

  // end update
  lastTime = performance.now();
  requestAnimationFrame(update);

  function buttonConditions() {
    // maybe could be done better with event target or something??
    if (score < upgradeA_cost) upgradeA.disabled = true;
    else upgradeA.disabled = false;
    if (score < upgradeB_cost) upgradeB.disabled = true;
    else upgradeB.disabled = false;
    if (score < upgradeC_cost) upgradeC.disabled = true;
    else upgradeC.disabled = false;
  }

  function updateText() {
    scoreText.innerHTML = `Score: ${score.toFixed(3)}`;
    rateText.innerHTML = `Rate: ${total_rate.toFixed(3)}`;
    FPS = 1000 / deltaTime(); // 1000ms = 1s
    FPSText.innerHTML = `FPS: ${FPS.toFixed(0)}`;
  }

  function incrementScore() {
    score += (total_rate * deltaTime()) / 1000;
  }
}

// returns difference in time since last update
function deltaTime() {
  return performance.now() - lastTime;
}

// ========= Game Logic =========
let score: number = 0;
let total_rate: number = 0;
const upgradeA_cost: number = 10;
const upgradeB_cost: number = 100;
const upgradeC_cost: number = 1000;
const upgradeA_rate: number = 0.1;
const upgradeB_rate: number = 2;
const upgradeC_rate: number = 50;
let upgradeA_level: number = 0;
let upgradeB_level: number = 0;
let upgradeC_level: number = 0;

upgradeA.innerHTML = `Buy upgradeA (${upgradeA_cost})`;
upgradeB.innerHTML = `Buy upgradeB (${upgradeB_cost})`;
upgradeC.innerHTML = `Buy upgradeC (${upgradeC_cost})`;

// i know this is really bad, but i need to be on step 9 to fix. I will fix later.
upgradeA.addEventListener("click", () => {
  score -= upgradeA_cost;
  upgradeA.innerHTML = `Autoclicker lvl ${upgradeA_level + 1} (${upgradeA_cost})`;
  upgradeA_level++;
  total_rate += upgradeA_rate;
});

upgradeB.addEventListener("click", () => {
  score -= upgradeB_cost;
  upgradeB.innerHTML = `Autoclicker lvl ${upgradeB_level + 1} (${upgradeB_cost})`;
  upgradeB_level++;
  total_rate += upgradeB_rate;
});

upgradeC.addEventListener("click", () => {
  score -= upgradeA_cost;
  upgradeC.innerHTML = `Autoclicker lvl ${upgradeC_level + 1} (${upgradeC_cost})`;
  upgradeC_level++;
  total_rate += upgradeC_rate;
});

// clicker functionality 
clicker.addEventListener("click", () => {
  score++;
});

// level counting wasnt working, changing it would step too much into step 9. Ill fix later.
// function init_upgrade(
//   button: HTMLButtonElement,
//   cost: number,
//   rate: number,
//   level: number,
// ) {
//   button.addEventListener("click", () => {
//     score -= cost;
//     button.innerHTML = `Autoclicker lvl ${level + 1} (${cost})`;

//     total_rate += rate;
//   });
// }

// init_upgrade(upgradeA, upgradeA_cost, upgradeA_rate, upgradeA_level);
// init_upgrade(upgradeB, upgradeB_cost, upgradeB_rate, upgradeB_level);
// init_upgrade(upgradeC, upgradeC_cost, upgradeC_rate, upgradeC_level);

// quick cheat code
window.addEventListener("keydown", (e) => {
  if (e.key === "e") {
    score += 1000;
  }
});

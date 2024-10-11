import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Rock Collector Simulator";
let lastTime = performance.now();
let FPS: number;
document.title = gameName;

// creating page elements
const header = document.createElement("h1");
const clicker = document.createElement("button");
const volunteer_button = document.createElement("button");
const intern_button = document.createElement("button");
const worker_button = document.createElement("button");
const buttonContainer = document.createElement("div");
const textContainer = document.createElement("div");
const scoreText = document.createElement("p");
const rateText = document.createElement("p");
const FPSText = document.createElement("p");

clicker.innerHTML = "Pick up rock";
header.innerHTML = gameName;

// assembling page
app.append(header);
app.append(clicker);
app.append(buttonContainer);
buttonContainer.append(volunteer_button);
buttonContainer.append(intern_button);
buttonContainer.append(worker_button);
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
    if (score < volunteer_cost) volunteer_button.disabled = true;
    else volunteer_button.disabled = false;
    if (score < intern_cost) intern_button.disabled = true;
    else intern_button.disabled = false;
    if (score < worker_cost) worker_button.disabled = true;
    else worker_button.disabled = false;
  }

  function updateText() {
    scoreText.innerHTML = `Rocks Collected: ${score.toFixed(3)}`;
    rateText.innerHTML = `Collection Rate: ${total_rate.toFixed(3)}`;
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
const universal_price_multiplier: number = 1.15;
let total_rate: number = 0;
let volunteer_cost: number = 10;
let intern_cost: number = 100;
let worker_cost: number = 1000;
const volunteer_rate: number = 0.1;
const intern_rate: number = 2;
const worker_rate: number = 50;
let volunteer_quantity: number = 0;
let intern_quantity: number = 0;
let worker_quantity: number = 0;

volunteer_button.innerHTML = `Get Volunteer (${volunteer_cost})`;
intern_button.innerHTML = `Obtain Intern (${intern_cost})`;
worker_button.innerHTML = `Hire Worker (${worker_cost})`;

// i know this is really bad, but i need to be on step 9 to fix. I will fix later.
volunteer_button.addEventListener("click", () => {
  score -= volunteer_cost;
  volunteer_button.innerHTML = `Number of Volunteers: ${volunteer_quantity + 1} (${volunteer_cost.toFixed(0)})`;
  volunteer_cost *= universal_price_multiplier;
  volunteer_quantity++;
  total_rate += volunteer_rate;
});

intern_button.addEventListener("click", () => {
  score -= intern_cost;
  intern_button.innerHTML = `Number of Interns: ${intern_quantity + 1} (${intern_cost.toFixed(0)})`;
  intern_cost *= universal_price_multiplier;
  intern_quantity++;
  total_rate += intern_rate;
});

worker_button.addEventListener("click", () => {
  score -= volunteer_cost;
  worker_button.innerHTML = `Number of Workers: ${worker_quantity + 1} (${worker_cost.toFixed(0)})`;
  worker_cost *= universal_price_multiplier;
  worker_quantity++;
  total_rate += worker_rate;
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

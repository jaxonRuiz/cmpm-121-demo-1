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
const professional_button = document.createElement("button");
const sorceror_button = document.createElement("button");
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
buttonContainer.append(professional_button);
buttonContainer.append(sorceror_button);
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
    autocollectors.forEach((collector) => {
      if (score < collector.cost) collector.button.disabled = true;
      else collector.button.disabled = false;
    });
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

interface autocollector {
  name: string;
  verb: string;
  cost: number;
  rate: number;
  quantity: number;
  button: HTMLButtonElement;
}

const autocollectors: autocollector[] = [
  {
    name: "Volunteer",
    verb: "Convince",
    cost: 10,
    rate: 0.1,
    quantity: 0,
    button: volunteer_button,
  },
  {
    name: "Intern",
    verb: "Incentivize",
    cost: 100,
    rate: 2,
    quantity: 0,
    button: intern_button,
  },
  {
    name: "Worker",
    verb: "Hire",
    cost: 300,
    rate: 20,
    quantity: 0,
    button: worker_button,
  },
  {
    name: "Professional",
    verb: "Convince",
    cost: 1000,
    rate: 500,
    quantity: 0,
    button: professional_button,
  },
  {
    name: "Sorceror",
    verb: "Summon",
    cost: 10000,
    rate: 1000,
    quantity: 0,
    button: sorceror_button,
  },
];

// clicker functionality
clicker.addEventListener("click", () => {
  score++;
});

// initializing collector upgrades
autocollectors.forEach((collector) => {
  collector.button.innerHTML = `${collector.verb} ${collector.name} (${collector.cost.toFixed(2)})`;

  collector.button.addEventListener("click", () => {
    score -= collector.cost;
    collector.quantity++;
    collector.cost *= universal_price_multiplier;
    total_rate += collector.rate;
    collector.button.innerHTML = `${collector.verb} ${collector.name}: (${collector.cost.toFixed(2)})`;
  });
});

// quick cheat code
window.addEventListener("keydown", (e) => {
  if (e.key === "e") {
    score += 1000;
  }
});

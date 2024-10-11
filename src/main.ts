import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Rock Collector Simulator";
const gameDescription =
  "You are a rabid rock collector. For reasons known only to yourself, you are solely dedicated to the collection of rocks. <br> <br>";
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
const descriptionBox = document.createElement("div");

clicker.innerHTML = "Pick up rock";
descriptionBox.innerHTML = gameDescription;
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
app.append(descriptionBox);

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

// clicker functionality
clicker.addEventListener("click", () => {
  score++;
});

clicker.addEventListener("mouseover", () => {
  descriptionBox.innerHTML =
    "The ground is rife with rocks, just waiting to be collected. <br> <br>";
});

clicker.addEventListener("mouseout", () => {
  descriptionBox.innerHTML = gameDescription;
});

// ========= Autocollectors =========

interface autocollector {
  name: string;
  verb: string;
  cost: number;
  rate: number;
  quantity: number;
  button: HTMLButtonElement;
  description: string;
}

const autocollectors: autocollector[] = [
  {
    name: "Volunteer",
    verb: "Convince",
    cost: 10,
    rate: 0.1,
    quantity: 0,
    button: volunteer_button,
    description: `Convince a volunteer to help you in your quest to amass rocks.`,
  },
  {
    name: "Intern",
    verb: "Incentivize",
    cost: 100,
    rate: 2,
    quantity: 0,
    button: intern_button,
    description: `Incentivize an intern with work experience to dedicate more time to finding rocks.`,
  },
  {
    name: "Worker",
    verb: "Hire",
    cost: 300,
    rate: 20,
    quantity: 0,
    button: worker_button,
    description: `Hire a dedicated worker to grow your rock collection.`,
  },
  {
    name: "Professional",
    verb: "Convince",
    cost: 1000,
    rate: 500,
    quantity: 0,
    button: professional_button,
    description: `Find a like-minded individual willing and dedicated to the persuit of small goelogical objects.`,
  },
  {
    name: "Sorceror",
    verb: "Summon",
    cost: 10000,
    rate: 1000,
    quantity: 0,
    button: sorceror_button,
    description: `Break the laws of equal exchange and summon a being from another realm solely to amass an unreasnoable amount of rocks.`,
  },
];

// initializing collector upgrades
autocollectors.forEach((collector) => {
  collector.button.innerHTML = `${collector.verb} ${collector.name} (${collector.cost.toFixed(2)})`;

  collector.button.addEventListener("click", () => {
    score -= collector.cost;
    collector.quantity++;
    collector.cost *= universal_price_multiplier;
    total_rate += collector.rate;
    collector.button.innerHTML = `${collector.verb} ${collector.name}: (${collector.cost.toFixed(2)})`;
    descriptionBox.innerHTML = `${collector.description} <br> You have: ${collector.quantity} ${collector.name}s`;
  });

  collector.button.addEventListener("mouseover", () => {
    descriptionBox.innerHTML = `${collector.description} <br> You have: ${collector.quantity} ${collector.name}s`;
  });

  collector.button.addEventListener("mouseout", () => {
    descriptionBox.innerHTML = gameDescription;
  });
});

// quick cheat code
window.addEventListener("keydown", (e) => {
  if (e.key === "e") {
    score += 1000;
  }
});

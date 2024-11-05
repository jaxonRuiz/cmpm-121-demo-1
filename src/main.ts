import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Rock Collector Simulator";
const gameDescription =
  "You are a rabid rock collector. For reasons known only to yourself, you are solely dedicated to the collection of rocks. <br> <br>";
let lastTime = performance.now();
let FPS: number;
document.title = gameName;

// ========== HTML Elements ==========
const header = document.createElement("h1");
const clickerButton = document.createElement("button");
const buttonContainer = document.createElement("div");
const textContainer = document.createElement("div");
const scoreText = document.createElement("p");
const rateText = document.createElement("p");
const FPSText = document.createElement("p");
const descriptionBox = document.createElement("div");

// clicker functionality
clickerButton.innerHTML = "Pick up rock";
clickerButton.style.width = "150px";
clickerButton.style.height = "75px";
clickerButton.addEventListener("click", () => {
  score++;
  clickerButton.style.transform = "scale(0.95)";
  setTimeout(() => {
    clickerButton.style.transform = "scale(1.05)";
  }, 100);
});

clickerButton.addEventListener("mouseover", () => {
  updateGameDescription(
    "The ground is rife with rocks, just waiting to be collected. <br> <br>",
  );
  clickerButton.style.transform = "scale(1.1)";
});

clickerButton.addEventListener("mouseout", () => {
  updateGameDescription(gameDescription);
  clickerButton.style.transform = "scale(1.0)";
});

// assembling page
app.append(header);
app.append(clickerButton);
app.append(buttonContainer);
app.append(textContainer);
textContainer.append(scoreText);
textContainer.append(rateText);
textContainer.append(FPSText);
app.append(descriptionBox);
descriptionBox.innerHTML = gameDescription;
header.innerHTML = gameName;

// ========= Game Logic =========
let score: number = 0;
const universal_price_multiplier: number = 1.15;
let total_rate: number = 0;

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
      if (score < collector.cost) {
        collector.button.disabled = true;
        collector.button.style.backgroundColor = "#1a1a1a";
      } else {
        collector.button.style.backgroundColor = "#878682";
        collector.button.disabled = false;
      }
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

// ========= Autocollectors upgrades =========
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
    button: clickerButton, // using clicker as a placeholder to not be undefined
    description: `Convince a volunteer to help you in your quest to amass rocks.`,
  },
  {
    name: "Intern",
    verb: "Incentivize",
    cost: 100,
    rate: 2,
    quantity: 0,
    button: clickerButton,
    description: `Incentivize an intern with work experience to dedicate more time to finding rocks.`,
  },
  {
    name: "Worker",
    verb: "Hire",
    cost: 300,
    rate: 20,
    quantity: 0,
    button: clickerButton,
    description: `Hire a dedicated worker to grow your rock collection.`,
  },
  {
    name: "Professional",
    verb: "Convince",
    cost: 1000,
    rate: 500,
    quantity: 0,
    button: clickerButton,
    description: `Find a like-minded individual willing and dedicated to the persuit of small goelogical objects.`,
  },
  {
    name: "Sorceror",
    verb: "Summon",
    cost: 10000,
    rate: 1000,
    quantity: 0,
    button: clickerButton,
    description: `Break the laws of equal exchange and summon a being from another realm solely to amass an unreasnoable amount of rocks.`,
  },
];

function upgradeButtonClicked(collector: autocollector) {
  score -= collector.cost;
  collector.quantity++;
  collector.cost *= universal_price_multiplier;
  total_rate += collector.rate;
  collector.button.innerHTML = `${collector.verb} ${collector.name}: (${collector.cost.toFixed(2)})`;
  descriptionBox.innerHTML = `${collector.description} <br> You have: ${collector.quantity} ${collector.name}s`;
}

function updateGameDescription(text: string) {
  descriptionBox.innerHTML = text;
}

// initializing collector upgrades
autocollectors.forEach((collector) => {
  collector.button = document.createElement("button");
  buttonContainer.append(collector.button);
  collector.button.innerHTML = `${collector.verb} ${collector.name} (${collector.cost.toFixed(2)})`;

  collector.button.addEventListener("click", () =>
    upgradeButtonClicked(collector),
  );

  collector.button.addEventListener("mouseover", () =>
    updateGameDescription(
      `${collector.description} <br> You have: ${collector.quantity} ${collector.name}s`,
    ),
  );

  collector.button.addEventListener("mouseout", () =>
    updateGameDescription(gameDescription),
  );
});

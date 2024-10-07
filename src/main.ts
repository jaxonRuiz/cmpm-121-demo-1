import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
document.title = gameName;

const header = document.createElement("h1");
const clicker = document.createElement("button");
const scoreContainer = document.createElement("div");

clicker.innerHTML = "⚾";
header.innerHTML = gameName;
scoreContainer.innerHTML = "Score: 0";
let score: number = 0;

clicker.addEventListener("click", () => {
  score++;
  scoreContainer.innerHTML = `Score: ${score}`;
});

app.append(header);
app.append(clicker);
app.append(scoreContainer);

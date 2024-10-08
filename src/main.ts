import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
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


// assembling page
app.append(header);
app.append(buttonContainer);
buttonContainer.append(clicker);
app.append(scoreContainer);



// update function to be called every interval to keep update cycles synced.
function update() {
  scoreContainer.innerHTML = `Score: ${score}`;
}
setInterval(update, 1000 / 60);

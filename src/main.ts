import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "boop a doop";
document.title = gameName;

const header = document.createElement("h1");
const button = document.createElement("button");
button.innerHTML = "⚾";
header.innerHTML = gameName;
app.append(header);
app.append(button);

console.log("Live reloading");
const valuesColor = [1, 2, 3, 4];

//Random function for each event
const randomizer = (valuesColor) => {
  let sequence = Array();
  for (let index = 0; index < 20; index++) {
    let levelIndex = Math.floor(Math.random() * valuesColor.length);
    let level = valuesColor[levelIndex];
    sequence.push(level);
  }
};

let pattern = randomizer(valuesColor);

let btn = document.querySelector(".game");
btn.addEventListener("click", function () {
  btn.setAttribute("class", "pressed");
});

const simonSay = (pattern) => {
  for (let index = 0; index < pattern.length; index++) {
    let current = document.getElementById(pattern[index]);
    current.setAttribute("pressed");
    let second = setTimeout(() => {}, timeout);
  }
};

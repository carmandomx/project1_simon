console.log("Live reloading");
//our colors
const colorsChoise = {
  purple,
  greenyellow,
  palevioletred,
  yellow,
};

//whitch color was choosen
const numberToColor = (index) => {
  if (index === 0) return "purple";
  if (index === 1) return "greenyellow";
  if (index === 2) return "palevioletred";
  if (index === 3) return "yellow";
};

//simon Say
let sequence = [];
const stages = 20;
const numberPGPY = 4;
let levels = 0;
let sublevels = 0;

//Start
const playGame = () => {
  sequence = new Array(stages);
  sequence = sequence
    .fill(0)
    .map((pattern) => Math.floor(Math.random() * numberPGPY));
  levels = 0;
  sublevels = 0;
  startBtn.classList.add("hideIt");
  lightUpPattern();
};

//End
const endGame = () => {
  startBtn.classList.remove("hideIt");
  //falsy value
  levels = -1;
};

/* LIGTHS */
//light up pattern
const hideColor = 350;
const waiting = 600;
const mediumWait = 1200;

const lightUpPattern = () => {
  for (let index = 0; index <= levels; index++) {
    const color = numberToColor(sequence[index]);
    setTimeout(() => glowUpPattern(color), waiting * index);
  }
};

//glow up
const glowUpPattern = (color) => {
  colorsChoise[color].classList.add("glowUp");
  setTimeout(() => turnOffPattern(color), hideColor);
};

//turn off color
const turnOffPattern = (color) => {
  colorsChoise[color].classList.remove("glowUp");
};

//to choose the color according to the user
const userColorClick = (onClick) => {
  //static game.
  if (levels === -1) return;
  // retrieve active color name based on color-data (html)
  const chosenColor = onClick.target.dataset.color;
  // we find out your position according to the case (if.)
  const caseColor = colorToNumber(chosenColor);
  // turn light.
  glowUpPattern(chosenColor);

  //If the pressed button corresponds to the pattern.
  if (caseColor === sequence[sublevels]) {
    //continue the event.
    sublevels++;
    //next stage.
    if (sublevels > levels) {
      //next step.
      levels++;

      //If we win.
      if (levels === stages) {
        console.log("Ganaste!");
        /*
        Warnings here!!!
        */
        endGame();
      } else {
        //reset it.
        sublevels = 0;
        //next pattern in screen.
        setTimeout(lightUpPattern, mediumWait);
      }
    }
  } else {
    //if user fails
    console.log("perdiste");
    /*
    Warnings here!!!
    */
    endGame();
  }
};

// Return the assigned number by color
const colorToNumber = (color) => {
  if (color === "purple") return 0;
  if (color === "greenyellow") return 1;
  if (color === "palevioletred") return 2;
  if (color === "yellow") return 3;
};

//buttons in DOM.
colorsChoise.purple.addEventListener("click", userColorClick);
colorsChoise.greenyellow.addEventListener("click", userColorClick);
colorsChoise.palevioletred.addEventListener("click", userColorClick);
colorsChoise.yellow.addEventListener("click", userColorClick);

//audio media
//buttonBegin
let soundB = document.querySelector(".startBtn");
soundB.addEventListener("click", function () {
  let tagAudio = document.createElement("audio");
  tagAudio.setAttribute("src", "./media/simonClick.mp3");
  tagAudio.play();
});

//button1 - purple
let sound1 = document.querySelector("#purple");
sound1.addEventListener("click", function () {
  let tagAudio = document.createElement("audio");
  tagAudio.setAttribute("src", "./media/simonSound1.mp3");
  tagAudio.play();
});

//button2 - greenyellow
let sound2 = document.querySelector("#greenyellow");
sound2.addEventListener("click", function () {
  let tagAudio = document.createElement("audio");
  tagAudio.setAttribute("src", "./media/simonSound2.mp3");
  tagAudio.play();
});

//button3 - palevioletred
let sound3 = document.querySelector("#palevioletred");
sound3.addEventListener("click", function () {
  let tagAudio = document.createElement("audio");
  tagAudio.setAttribute("src", "./media/simonSound3.mp3");
  tagAudio.play();
});

//button4 - yellow
let sound4 = document.querySelector("#yellow");
sound4.addEventListener("click", function () {
  let tagAudio = document.createElement("audio");
  tagAudio.setAttribute("src", "./media/simonSound4.mp3");
  tagAudio.play();
});

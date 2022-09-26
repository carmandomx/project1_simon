console.log("Live reloading");
//our colors
const colorsChoise = {
  purple,
  greenyellow,
  palevioletred,
  yellow,
};

/* SOUND */
const uploadSound = function (fuente) {
  const sound = document.createElement("audio");
  sound.src = fuente;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);
  return sound;
};

const soundPurple = uploadSound("./media/simonSound1.mp3"),
  soundGreenyellow = uploadSound("./media/simonSound2.mp3"),
  soundPalevioletred = uploadSound("./media/simonSound3.mp3"),
  soundYellow = uploadSound("./media/simonSound4.mp3");

//Sound for button

//button start - optional
let soundStart = document.querySelector(".startBtn");
soundStart.addEventListener("click", function () {
  let tagAudio = document.createElement("audio");
  tagAudio.setAttribute("src", "./media/simonClick.mp3");
  //tagAudio.play();
});

//which color was chosen
const numberToColor = (index) => {
  if (index === 0) return "purple";
  if (index === 1) return "greenyellow";
  if (index === 2) return "palevioletred";
  if (index === 3) return "yellow";
};

//simon Says
let sequence = [];
const stages = 20;
const numberPGPY = 4;
let levels = 0;
let sublevels = 0;

//Start
const playGame = () => {
  document.querySelector("#tittle").textContent = "Simon says...";
  document.querySelector("#startBtn").textContent = "Start";
  sequence = new Array(stages);
  sequence = sequence
    .fill(0)
    .map((pattern) => Math.floor(Math.random() * numberPGPY));
  levels = 0;
  sublevels = 0;
  // the button is created and hidden once the game starts
  startBtn.classList.add("hideIt");
  const startOverBtn = document.querySelector("#startOverBtn");
  startOverBtn.classList.remove("hideIt");
  document.querySelector("#js-score").textContent = `Level ${
    levels + 1
  } of ${stages}`;
  lightUpPattern();
};

//start over, created a new function that will add a button to restart the game, from the current pattern, if the page is refreshed it will create a complete new game
const startOver = () => {
  levels = 0;
  sublevels = 0;
  document.querySelector("#js-score").textContent = `Level ${levels + 1} of 20`;
  lightUpPattern();
};

//End
const endGame = () => {
  startBtn.classList.remove("hideIt");
  startOverBtn.classList.add("hideIt");
  //falsy value
  levels = -1;
};

/* LIGTHS */
//light up pattern
const hideColor = 450;
const waiting = 700;
const mediumWait = 1400;
let colorSound;

const lightUpPattern = () => {
  for (let index = 0; index <= levels; index++) {
    const color = numberToColor(sequence[index]);
    setTimeout(() => glowUpPattern(color), waiting * index);
    //console.log(color);
  }
};

//glow up
const glowUpPattern = async (color) => {
  colorsChoise[color].classList.add("glowUp");
  setTimeout(() => turnOffPattern(color), hideColor);

  if (color === "purple") {
    colorSound = soundPurple;
  } else if (color === "greenyellow") {
    colorSound = soundGreenyellow;
  } else if (color === "palevioletred") {
    colorSound = soundPalevioletred;
  } else {
    colorSound = soundYellow;
  }
  colorSound.currentTime = 0;
  await colorSound.play();
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
  document.querySelector("#tittle").textContent = "Simon says...";
  if (caseColor === sequence[sublevels]) {
    //continue the event.
    sublevels++;

    //next stage.
    if (sublevels > levels) {
      //next step.
      levels++;
      //added a counter to show the current level that you're on, this was added to the other conditional and to the start over to restart the level count
      document.querySelector("#js-score").textContent = `Level ${
        levels + 1
      } of 20`;

      //If we win.
      if (levels === stages) {
        console.log("Ganaste!");
        document.querySelector("#tittle").textContent = "You win!"; //update the title to show the user they've won
        document.querySelector("#startBtn").textContent = "Play again"; //update the button label to play again with a new pattern
        endGame(); //calls the endGame function
      } else {
        //reset it.
        sublevels = 0;
        //next pattern in screen.
        setTimeout(lightUpPattern, mediumWait);
      }
    }
  } else {
    //if user fails
    document.querySelector("#tittle").textContent = "Error! Try again."; //update title to show an error
    //timeout so a second passes before updating anything
    setTimeout(function () {
      levels = 0; //restart levels so the user starts the pattern from the start
      sublevels = 0;
      document.querySelector("#js-score").textContent = `Level ${
        levels + 1
      } of 20`; //restart the levels label
      lightUpPattern(); //call the function to repeat the pattern
    }, 1000);
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

console.log("Live reloading");
/* First we create a collection of colors, each for the color of the button*/
const colorsChoise = {
  purple,
  greenyellow,
  palevioletred,
  yellow,
};

/* SOUND.- we call the audio (function) that we will use when each button is clicked
 */

const uploadSound = function (fuente) {
  const sound = document.createElement("audio");
  sound.src = fuente;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);
  return sound;
};

//Sound for button
/* now we assign each button its corresponding tone/sound */
const soundPurple = uploadSound("./media/simonSound1.mp3"),
  soundGreenyellow = uploadSound("./media/simonSound2.mp3"),
  soundPalevioletred = uploadSound("./media/simonSound3.mp3"),
  soundYellow = uploadSound("./media/simonSound4.mp3");

//Later, we create a condition for the index value in our collection. Then we discover the color that was chosen.
const numberToColor = (index) => {
  if (index === 0) return "purple";
  if (index === 1) return "greenyellow";
  if (index === 2) return "palevioletred";
  if (index === 3) return "yellow";
};

//Parameters for simon Says function (playGame).
let sequence = [];
const stages = 20;
const numberPGPY = 4;
let levels = 0;
let sublevels = 0;

//For start the game we need click the button (html, btnStart) and call the function.
const playGame = () => {
  document.querySelector("#tittle").textContent = "Simon says...";
  document.querySelector("#startBtn").textContent = "Start";
  /* We create a new array with stages lenght. */
  sequence = new Array(stages);
  /* reassign sequence value for a array with random numbers for a new sequence pattern. */
  sequence = sequence
    .fill(0)
    .map((pattern) => Math.floor(Math.random() * numberPGPY));
  levels = 0;
  sublevels = 0;
  //Hide the start bouton (btnStart)
  startBtn.classList.add("hideIt");
  const startOverBtn = document.querySelector("#startOverBtn");
  startOverBtn.classList.remove("hideIt");
  document.querySelector("#js-score").textContent = `Level ${
    levels + 1
  } of ${stages}`;
  /* We call the illumination function */
  lightUpPattern();
};

//start over
const startOver = () => {
  levels = 0;
  sublevels = 0;
  document.querySelector("#js-score").textContent = `Level ${levels + 1} of 20`;
  lightUpPattern();
};

//Function for end the game.
const endGame = () => {
  startBtn.classList.remove("hideIt");
  startOverBtn.classList.add("hideIt");
  //falsy value
  levels = -1;
};

/* LIGTHS */
//timers for light up pattern
const hideColor = 450;
const waiting = 700;
const mediumWait = 1400;
let colorSound;

/* We create a function for light up pattern */
const lightUpPattern = () => {
  //for each value in sequence array
  for (let index = 0; index <= levels; index++) {
    //color is the value called since our case then return color value that be equal to value in sequence.
    const color = numberToColor(sequence[index]);
    //timer waiting.
    setTimeout(() => glowUpPattern(color), waiting * index);
  }
};

//glow up function por the pattern.
const glowUpPattern = async (color) => {
  colorsChoise[color].classList.add("glowUp");
  setTimeout(() => turnOffPattern(color), hideColor);

  //for each color we call the sound assigned.
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

//turn off color function.
const turnOffPattern = (color) => {
  colorsChoise[color].classList.remove("glowUp");
};

//Now, to choose the color according to the user when him click the color.
const userColorClick = (onClick) => {
  //static game case.
  if (levels === -1) return;
  // retrieve active color name based on color-data (html)
  const chosenColor = onClick.target.dataset.color;
  // we find out your position according to the case (if.)
  const caseColor = colorToNumber(chosenColor);
  // turn light according color.
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
      document.querySelector("#js-score").textContent = `Level ${
        levels + 1
      } of 20`;

      //If we win.
      if (levels === stages) {
        console.log("Ganaste!");
        document.querySelector("#tittle").textContent = "You win!";
        document.querySelector("#startBtn").textContent = "Play again";
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
    document.querySelector("#tittle").textContent = "Error! Try again.";
    //timeout
    setTimeout(function () {
      levels = 0;
      sublevels = 0;
      document.querySelector("#js-score").textContent = `Level ${
        levels + 1
      } of 20`;
      lightUpPattern();
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

// Declare important variables
const startButton = document.querySelector(".start-game");
const restartButton = document.querySelector(".start-over");
const colors = ["red", "blue", "yellow", "green"];
let pattern = [];
let inputPattern = [];
let level = 1;
let wrongCounter = 0;
let hardMode = false;
let started = false;

// Selecting elements from the DOM to update during the game
const wrongTracker = document.querySelector("#wrong-counter");
const winText = document.querySelector(".newGame");
const buttons = document.querySelectorAll(".quadrant");
const hardModeButton = document.querySelector("#hard-mode"); // new button for hard mode
const hardModeText = document.querySelector("#hard-mode-advice");

// Add an event listener to startButton that runs nextSequence() function
startButton.addEventListener("click", () => {
  if (!started) {
    nextSequence();
    started = true;
    winText.textContent = "Follow the pattern";
    wrongTracker.textContent = "Wrong responses: 0";
  } else {
    return;
  }
});

// Add an event listener to restartButton that runs startOver() function
restartButton.addEventListener("click", () => {
  startOver();
});

// Event listener for buttons representing game colors
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const chosenColor = button.id;
    inputPattern.push(chosenColor);
    animatePress(chosenColor);
    checkAnswer(inputPattern.length - 1);
    playSound(chosenColor);
  });
});

// Event listener for hard mode button
hardModeButton.addEventListener("click", () => {
  hardMode = !hardMode; // toggle the hardMode variable
  hardModeButton.textContent = !hardMode ? "Easy Mode" : "Hard Mode"; // change button text content
  if (hardMode) {
    hardModeText.textContent = "Watch out, hard mode is on!";
  } else {
    hardModeText.textContent = "You are playing on easy mode";
  }
  startOver(); // start over the game with the new mode
});

// Function to check if the user input is correct
const checkAnswer = (currentLevel) => {
  if (pattern[currentLevel] === inputPattern[currentLevel]) {
    if (inputPattern.length === pattern.length) {
      toggleButtonActivity(true);
      setTimeout(() => {
        // replay the entire pattern
        for (let i = 0; i < pattern.length; i++) {
          setTimeout(() => {
            const button = document.querySelector(`#${pattern[i]}`);
            button.classList.add("active");
            playSound(pattern[i]);
            setTimeout(() => {
              button.classList.remove("active");
              if (i === pattern.length - 1) {
                toggleButtonActivity(false);
              }
            }, 100);
          }, 500 * i);
        }
        level++;
        document.querySelector("#steps").textContent = `Steps: ${level}`;
        setTimeout(() => {
          nextSequence();
        }, 500 * pattern.length);
      }, 1000);
    }
  } else {
    // If hardMode active restart the game
    if (hardMode) {
      startOver();
    }
    inputPattern = [];
    wrongCounter++;
    wrongTracker.textContent = `Wrong responses: ${wrongCounter}`;
    wrongTracker.classList.add("wrong");
    toggleButtonActivity(true);
    setTimeout(() => {
      wrongTracker.classList.remove("wrong");

      for (let i = 0; i < pattern.length; i++) {
        setTimeout(() => {
          const button = document.querySelector(`#${pattern[i]}`);
          button.classList.add("active");
          playSound(pattern[i]);
          setTimeout(() => {
            button.classList.remove("active");
            if (i === pattern.length - 1) {
              toggleButtonActivity(false);
            }
          }, 100);
        }, 500 * i);
      }
    }, 1000);
  }
};

// Play the corresponding sound
const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

// Generate the next color in the pattern and animates the corresponding button
const nextSequence = () => {
  inputPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNumber];
  pattern.push(randomColor);

  const button = document.querySelector(`#${randomColor}`);
  button.classList.add("active");
  playSound(randomColor);
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);

  // If the player reaches level 20, he wins
  if (level === 20) {
    winText.textContent = "Congrats! Press this text to start a new game";
    toggleButtonActivity(true);
    winText.addEventListener("click", () => {
      startOver();
    });
  }
};

// Animates buttons
const animatePress = (currentColor) => {
  const button = document.querySelector(`#${currentColor}`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
};
// R  esets all game variables
const startOver = () => {
  level = 1;
  inputPattern = [];
  wrongCounter = 0;
  pattern = [];
  started = false;
  winText.textContent = "Follow the pattern";
  toggleButtonActivity(false);
  document.querySelector("#steps").textContent = `Steps: 1`;

  wrongTracker.textContent = "Wrong responses: 0"; // reset the text content
  nextSequence();
};

// Used to activate or desactivate buttons
const toggleButtonActivity = (activity) => {
  const colors = document.querySelectorAll(".quadrant");
  colors.forEach((button) => {
    button.disabled = activity;
  });
};

//Query selectors and arrays.
const quadrants = document.querySelectorAll(".quadrant");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart");
const levelDisplay = document.getElementById("level-display");
const hard = document.getElementById("Hard");
const gamePattern = [];
let userPattern = [];
let level = 0;
let isGameStarted = false;

//Define a object with the sounds of the buttons
const sounds = {
  red: document.getElementById("sound-red"),
  green: document.getElementById("sound-green"),
  blue: document.getElementById("sound-blue"),
  yellow: document.getElementById("sound-yellow"),
};

// Function to create a random pattern for the game. 
function generateGamePattern() {
  const colors = ["red", "green", "blue", "yellow"]; //It creates an array with the color
  const randomNum = Math.floor(Math.random() * 4); //Gets a random number between 0, 1, 2 and 3
  const randomColor = colors[randomNum]; //Sets a variable with the name that has the index of the random number
  gamePattern.push(randomColor); //Push the color in the "game pattern" array
}

// Function to animate the game pattern
function animateGamePattern() {
  let i = 0; //Create a variable that will iterate
  const interval = setInterval(() => { //Create an interval that will run each 1000 ms
    const quadrant = document.getElementById(gamePattern[i]); //Get the element of the game patter array (for example, if the first element of the gamePattern array is red, it will select that button)
    quadrant.style.filter = "brightness(125%)"; //Apply a filter of 125% of brightness 
    sounds[gamePattern[i]].currentTime = 0; //Play the sound from the start
    sounds[gamePattern[i]].play();
    setTimeout(() => { //Set a timeout interval of 500ms and then return the brightness to 100%. With this, each interval, each button will glow and then return to its original bright
      quadrant.style.filter = "brightness(100%)";
    }, 500);
    i++; //Afther it finishes with the animation of the first button of the gamePattern array, it will continue to the next index.
    if (i >= gamePattern.length) { //And if the index is grather than the lenght of the array, it will stop the intervals. 
      clearInterval(interval);
    }
  }, 1000);
}

// Function to compare the user pattern and the game pattern
function checkPattern() {
  for (let i = 0; i < userPattern.length; i++) { //For statement that compares every index of the userPattern array and the gamePattern array
    if (userPattern[i] !== gamePattern[i]) {
      return false; //If one of the index is different it returns false
    }
  }
  return true; //If everything is equal, returns true.
}

// Function to reset the game. Sets all the values to 0, my variable isGameStarted to false and cleans the text of the level display.
function resetGame() {
  gamePattern.length = 0;
  userPattern.length = 0;
  level = 0;
  isGameStarted = false;
  levelDisplay.innerHTML = "";
}

// Function to show the game sequence. Basically runs the showGamePattern function and returns the userPattern to an empty state
function showGameSequence() {
  animateGamePattern();
  userPattern = [];
}

//Restart button event listener
restartButton.addEventListener("click", () => {
  if (isGameStarted) { //Only works if the game had already started
    resetGame(); //Runs the function reset game
    isGameStarted = true; //Changes the variable isGameStarted to true. 
    generateGamePattern(); //Runs the functions to generate and show a new game pattern
    showGameSequence();
    level++; //Add a unit to the level variable.
    levelDisplay.innerHTML = `Number of steps: ${level}`; //Show the current level/step
  }
});

// Start button event listener 
startButton.addEventListener("click", () => {
  if (!isGameStarted) { //Only works if the game hasn't started yet
    isGameStarted = true; //Sets the variable to true
    generateGamePattern(); //Generates and shows a new game pattern
    showGameSequence();
    level++; //Add a unit to the level variable
    levelDisplay.innerHTML = `Number of steps: ${level}`; //Show the current level/step
  }
});

//Function to animate the color buttons of the game
function animateQuadrant(quadrant) { //This function is used when the user clicks the buttons to copy the pattern.
  quadrant.style.filter = "brightness(125%)"; //It does the same than the interval inside the animateGamePattern function. Sets a filter, plays a sound and remove the filter after 500ms.
  sounds[quadrant.id].currentTime = 0;
  sounds[quadrant.id].play();
  setTimeout(() => {
    quadrant.style.filter = "brightness(100%)";
  }, 500);
}

// Color buttons event listener
quadrants.forEach((quadrant) => { //Each button was set to a variable called cuadrant, we use the for each method to apply an event listener to all the quadrants.
  quadrant.addEventListener("click", () => {
    if (isGameStarted) { //After a click and if the game has already started
      userPattern.push(quadrant.id); //We push to the array of userPattern the id of the button pressed (red,blue,green or yellow)
      animateQuadrant(quadrant); //Then use the animateQuadrant function to iluminate the pressed button. 
      if (userPattern.length === gamePattern.length) { //The we check if the userPattern is the same lenght than the gamePattern. 
        if (checkPattern()) { //If the lenght is the same, we check the two arrays with the function checkPattern. 
          if (gamePattern.length < 20) { //If the two arrays are the same it means the user did the corrects inputs, and if the level/step is less than 20,
            generateGamePattern(); //We generate another pattern for the array
            showGameSequence(); //And show the complete sentence
            level++; //Also add one unit to the level unit.
          } else {
            alert("Congratulations! You win!"); //If the lenght of both arrays is the same and have the same values but the length is 20 or more, the alert is shown
            resetGame(); //and the game is resseted with the funcition resetGame.
          }
          levelDisplay.innerHTML = `Number of steps: ${level}`; //When we are checking the pattern between arrays, the current step/level is shown
        } else if (hard.checked) { //This else if statement checks if the hard checkbox is selected, and if its, when the checkPattern function returns a false
          alert(`Game over! Your score is ${level}.`); //The alert Game over will be show and the last level/step reached.
          resetGame(); //Then the game will be reseted. 
        } else { //But if the checkPattern returns a false without the checkbox selected
          alert(`Wrong sequence!`); //This alert will be show
          showGameSequence(); //And the sequence will be show again from the beginning. 
        }
      }
    }
  });
});

const square = document.querySelector('.square');
const squareContainer = document.querySelector('.square-container');
const btnStart = document.querySelector('#btn-start');
const colors = ['red', 'green', 'yellow', 'blue'];
// function for button animation
const squareAnimation = (color) => {
  // Variable for select button using the color clicked
  const square = document.querySelector(`.square-${color}`);
  // Add styles to the color button clicked
  square.classList.add('pushed');
  // Remove styles after 200 milliseconds for push effect
  setTimeout(() => {
    square.classList.remove('pushed');
  }, 200);
};

const circleAnimation = () => {
  const circleStart = document.querySelector('.circle');
  console.log(circleStart);
  circleStart.classList.add('pushed');
  setTimeout(() => {
    circleStart.classList.remove('pushed');
  }, 200);
};

// Function to show the animation when the color is clicked
// it calls the function "squareAnimation"
const playerRound = () => {
  // Add event to the container to get the color of clicked button
  squareContainer.addEventListener('click', (event) => {
    // Condition to confirm that a square is clicked
    if (event.target.classList.contains('square')) {
      const color = event.target.id;
      // calls animation for the button and passes the color
      squareAnimation(color);
    }
  });
};
// Function to start the game
const start = () => {
  // When we are in a game the button will be disabled
  btnStart.setAttribute('disabled', true);
  playerRound();
};
// Eventlistener for the start button
btnStart.addEventListener('click', () => {
  // Calls the animation for button start
  circleAnimation();
  // Starts the game
  start();
});

const square = document.querySelector('.square');
const squareContainer = document.querySelector('.square-container');
// function for button animation
const squareAnimation = (color) => {
  // Variable for select button using the color clicked
  const square = document.querySelector(`.square-${color}`);
  // Add styles to the square clicked
  square.classList.add('pushed');
  // Remove styles after 200 milliseconds for push effect
  setTimeout(() => {
    square.classList.remove('pushed');
  }, 200);
};
// function to show the animation when the color is picked
// it calls the function "squareAnimation"
const playerRound = () => {
  squareContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('square')) {
      const color = event.target.id;
      squareAnimation(color);
    }
  });
};
// Starts the listening of click events
playerRound();

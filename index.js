const square = document.querySelector('.square');
const squareContainer = document.querySelector('.square-container');
const squareAnimation = (color) => {
  const square = document.querySelector(`.square-${color}`);
  // square.setAttribute('class', '.pushed');
  square.classList.add('pushed');
  setTimeout(() => {
    square.classList.remove('pushed');
  }, 200);
};

const playerRound = () => {
  squareContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('square')) {
      const color = event.target.id;
      squareAnimation(color);
    }
  });

  // return sequenceOK;
};

playerRound();

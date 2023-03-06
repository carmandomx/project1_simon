// constantes
const NUM_BUTTONS = 4
const MAX_STEPS = 20
const COLORS = ['green', 'red', 'yellow', 'blue']
const SOUNDS = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  ]

// variables
let gameStarted= false
let gameMode= 'normal'
let playerTurn = false
let playerSequence = []
let simonSequence = []
let step=0

// DOM elements
const buttons = document.querySelectorAll('.button')
const startButton = document.querySelector('.start')
const restartButton = document.querySelector('.restart')
const score = document.querySelector('.score')
const message = document.querySelector('.message')

function pressButton(button) { /* sound for each press of button*/
    button.classList.add('lit');
    SOUNDS[COLORS.indexOf(button.getAttribute('id'))].play();
    setTimeout(() => button.classList.remove('lit'), 500);
  }
  
  function giveSequence(sequence, index) { /* simon sequence generator*/
    message.textContent = 'Keep track of the sequence!';
    if (index < sequence.length) {
      const button = document.querySelector(`[id="${sequence[index]}"]`);
      setTimeout(() => {
        if (gameStarted === true){
        pressButton(button);
        giveSequence(sequence, index + 1);
    }}, 1000);
    } else {
      playerTurn = true;
      message.textContent = 'Show me the sequence!';
    }
  }
  
  function startGame() { /* initial values for a new game to start*/
    gameStarted = true;
    playerTurn = false;
    playerSequence = [];
    simonSequence = [getRandomColor()];
    step = 1;
    message.textContent = '';
    score.textContent = `Level ${step} of 20`;
    giveSequence(simonSequence, 0);
  }
  
  function restartGame() { /* reset values*/
    gameStarted = false;
    playerTurn = false;
    playerSequence = [];
    simonSequence = [];
    step = 0;
    score.textContent = 'Level 0 of 20';
    message.textContent = `Press start to play the game!`;
  }

  function changeMode(){ /* function to change modes between hard and normal*/
    if (gameMode==='normal'){
        document.body.style.backgroundColor = '#a36e6e';
        gameMode='hard'
        modeChange.textContent = 'Normal mode'
        restartGame()
    } else{
        document.body.style.backgroundColor = '#edf5c8';
        gameMode='normal'
        modeChange.textContent = 'Hard mode'
        restartGame()
    }
  }
  
  function getRandomColor() {
    return COLORS[Math.floor(Math.random() * NUM_BUTTONS)];
  }
  
  function checkSequence() {
    if (playerSequence[playerSequence.length - 1] !== simonSequence[playerSequence.length - 1]) {
      alert('Wrong sequence!');
      if (gameMode === 'hard') {
        restartGame();
      } else {
        playerTurn = false;
        playerSequence = [];
        giveSequence(simonSequence, 0);
      }
    } else if (playerSequence.length === simonSequence.length) { /* Values changes to start new iteration*/
      playerTurn = false;
      playerSequence = [];
      simonSequence.push(getRandomColor());
      step++;
      score.textContent = `Level ${step} of 20`;
      if (step > MAX_STEPS) {
        alert('You won! Feel free to press start to replay');
        restartGame();
      } else {
        giveSequence(simonSequence, 0);
      }
    }
  }
  
  // Event listeners
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (gameStarted && playerTurn) {
        pressButton(button);
        playerSequence.push(button.getAttribute('id'));
        checkSequence();
      }
    });
  });
  
  startButton.addEventListener('click', startGame);
  
  restartButton.addEventListener('click', restartGame);

  const modeChange = document.querySelector('.change-mode');
  modeChange.addEventListener('click', changeMode);
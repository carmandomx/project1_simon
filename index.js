// constantes
const NUM_BUTTONS = 4
const MAX_STEPS = 5
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

function pressButton(button) { // sound for each press of button
    button.classList.add('lit'); //new class to add visual changes to the button
    SOUNDS[COLORS.indexOf(button.getAttribute('id'))].play(); //button sound
    setTimeout(() => button.classList.remove('lit'), 500);
  }
  
  function giveSequence(sequence, index) { // visual and auditive sequence generator. receives the sequence and and the position of the button to sound.
    message.textContent = 'Keep track of the sequence!';
    if (index < sequence.length) { //check is all buttons have made its sound
      const button = document.querySelector(`[id="${sequence[index]}"]`); //next button to sound
      setTimeout(() => {
        if (gameStarted === true){ // check if the game is being played
        pressButton(button);
        giveSequence(sequence, index + 1); //calls the function for the next button in the sequence
    }}, 1000);
    } else { // once everything has sounded
      playerTurn = true;
      message.textContent = 'Show me the sequence!';
    }
  }
  
  function startGame() { // initial values for a new game to start once the button start is hit
    gameStarted = true;
    playerTurn = false;
    playerSequence = [];
    simonSequence = [getRandomColor()]; //simon sequence starts and is stored in this array
    step = 1; //first level
    message.textContent = '';
    score.textContent = `Level ${step} of 20`; // shows the level
    giveSequence(simonSequence, 0); //calls the function to manage the sequence order and buttons sounds
  }
  
  function restartGame() { // resets values for a new game
    gameStarted = false;
    playerTurn = false;
    playerSequence = [];
    simonSequence = [];
    step = 0;
    score.textContent = 'Level 0 of 20';
    message.textContent = `Press start to play the game!`;
  }

  function changeMode(){ // function to change the mode between normal and hard
    if (gameMode==='normal'){
        document.body.style.backgroundColor = '#a36e6e'; //visual change for the mode
        gameMode='hard'
        modeChange.textContent = 'Normal mode'
        restartGame()
    } else{
        document.body.style.backgroundColor = '#edf5c8';// visual change for the mode
        gameMode='normal'
        modeChange.textContent = 'Hard mode'
        restartGame()
    }
  }
  
  function getRandomColor() {
    return COLORS[Math.floor(Math.random() * NUM_BUTTONS)];
  }
  
  function checkSequence() { //check if sequence is correct each time a button is pressed by the player
    if (playerSequence[playerSequence.length - 1] !== simonSequence[playerSequence.length - 1]) { //checks if the last button pressed by the player matches the corresponding button in the simon sequence. If correct but not reached the simon sequence length it doesnt do anything and let the player continue
      alert('Wrong sequence!'); // if wrong button
      if (gameMode === 'hard') { // if its hard mode resets the game
        restartGame();
      } else {
        playerTurn = false;
        playerSequence = []; //sequence resets so that it has to be filled from scratch
        giveSequence(simonSequence, 0); // if normal mode the function for buttons in order and sound is called
      }
    } else if (playerSequence.length === simonSequence.length) { // if player reached simon sequence length correctly
      playerTurn = false; //finishes turn
      playerSequence = []; //resets players sequence (since it will have to be filled from scratch next turn)
      simonSequence.push(getRandomColor()); //simon sequence gets a new color
      step++; //next level
      score.textContent = `Level ${step} of 20`; //shows player advanced level
      if (step > MAX_STEPS) { //if over 20 turns game finished and let the player know they can keep playing
        alert('You won! Feel free to press start to replay');
        restartGame();
      } else {
        giveSequence(simonSequence, 0); // if 20 turns not reached simonsequence sound again
      }
    }
  }
  
  // Event listeners
  buttons.forEach(button => { //event listener for each button
    button.addEventListener('click', () => {
      if (gameStarted && playerTurn) {
        pressButton(button); //button sound
        playerSequence.push(button.getAttribute('id')); //player sequence updates with chosen button
        checkSequence(); //checks if correct
      }
    });
  });
  
  startButton.addEventListener('click', startGame);
  
  restartButton.addEventListener('click', restartGame);

  const modeChange = document.querySelector('.change-mode');
  modeChange.addEventListener('click', changeMode);

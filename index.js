
console.log('Live reloading');

// Asign html elementos to JS variables
const red = document.getElementById('color-1');
const green = document.getElementById('color-2');
const blue = document.getElementById('color-3');
const yellow = document.getElementById('color-4');

const message = document.getElementById('message');
const reset = document.getElementById('resetButton');

const startButton = document.getElementById('startButton');
const header = document.getElementById('header');

// Var declaration
let userPattern = [];
let correctPattern = [];
let currentColor = 0;

let won = false;

let gameStarted = false;
let mode = 'easy';

// Click to the color squares
red.addEventListener('click', (event) => handleButtonClick(event));
green.addEventListener('click', handleButtonClick);
blue.addEventListener('click', handleButtonClick);
yellow.addEventListener('click', handleButtonClick);

//  Reset button
reset.addEventListener('click', () => {
    resetGame(true);
    reset.style.display = 'none';
});

// click on start button
startButton.addEventListener('click', (event) => {
    play();
});

// Main function
function play() {
    // Create a random number between 1 and 4
    let randomNum = Math.floor(Math.random() * 4);
    // Insert the random number into the correctPattern array
    correctPattern.push(randomNum);
    // Set text values for the user
    startButton.style.display = 'none';
    message.style.display = 'initial';
    message.innerText = 'Wait for the computer to finish';
    reset.style.display = 'initial';
    // Call playNext sending a zero as value to start the game
    playNext(0);
}

function playNext(idx) {
    // Assign an element from the correctPattern array
    currentColor = correctPattern[idx];
    // Condition to verify if the array of pattern is over
    if(!currentColor) {
        gameStarted = true;
        /* 
            Display info of turns and leves, I have to create new variables, for some reason if I put 'correctPattern.length'
            the game did not work well and start to act weird
        */
        const CP = correctPattern.length;
        const UP = userPattern.length;
        message.innerText = `Your turn: ${CP - UP} taps`;
        header.innerText = `Level ${idx} of 20`;
        return;
    }

    // Animation oof the color buttons
    const currentElement = document.getElementById(`color-${currentColor}`);
    currentElement.classList.add('active');
    sound(currentColor);
    setTimeout(() => {
        currentElement.classList.remove('active');
        playNext(idx + 1);
    }, 500);
}

// Asign sound to the color buttons
function sound(colorNumber) {
    const audioName = './audio/simonSound' + colorNumber + '.mp3';
    let audio = new Audio(audioName);
    audio.play();
}

// Instead to write 4 diferent section of code, I use a handler
function handleButtonClick(e) {
    // Condition to know if the game finish or has been won
    if(!gameStarted || won) return;
    // Receive the ID from HTML like  'Color-#' and split it into numbers
    const colorID = e.target.id;
    const colorNumber = Number(colorID.split('-')[1]);
    // Insert the split number into the userPattern array
    userPattern.push(colorNumber);

    // Beep
    sound(colorNumber);

    let fail = false;

    // Compare every pattern of the user with the correct pattern
    for (let i = 0; i < userPattern.length; i++) {
        if(correctPattern[i] !== userPattern[i]) {
            message.innerText = 'Wrong pattern, please try again.';
            // One second to start the next level
            setTimeout(() => {
                // Identify if game is in easy mode or hardcore mode
                if(mode === 'easy') {
                    resetGame();
                    playNext(0);
                } else {
                    resetGame(true);
                    play();
                }
            }, 1000);
            fail = true;
            break;
        }
    }

    // Display info of taps that the user made
    const CP = correctPattern.length;
    const UP = userPattern.length;
    message.innerText = `Your turn: ${CP - UP} taps`;
    
    if(fail) return;
    
    // Set 20 levels to win the game 
    if(userPattern.length === 20) {
        won = true;
        message.innerText = 'YOU WIN';
        return;
    }

    // Compare every pattern of the user with the correct pattern
    if(userPattern.length === correctPattern.length) {
        message.innerText = 'Success! Keep going!';
        setTimeout(() => {
            nextLevel();
        }, 1000);
        
    }
}

// Go to the next level
function nextLevel() {
    // Create a random num for the color pattern
    let randomNum = Math.floor(Math.random() * 4) + 1;
   
    correctPattern.push(randomNum);
    console.log(correctPattern)
    resetGame();
    playNext(0);
}

// Reset values
function resetGame(newGame = false) {
    // Reset if we are playing new game
    if(newGame) {
        startButton.style.display = 'initial';
        message.style.display = 'none';
        correctPattern = [];
    } else { 
        // Message to user
        message.innerText = 'Wait for the computer to finish';
    }
    // Reset if we press the reset button
    won = false;
    userPattern = [];
    gameStarted = false;
}

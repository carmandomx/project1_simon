
console.log('Live reloading');

// Asign html clases to JS variables
const red = document.getElementById('color-1');
const green = document.getElementById('color-2');
const blue = document.getElementById('color-3');
const yellow = document.getElementById('color-4');

const message = document.getElementById('message');

const startButton = document.getElementById('startButton');

// Var declaration
let userPattern = [];
let correctPattern = [];
let currentColor = 0;

let gameStarted = false;
let mode = 'easy';

// Click to the color squares
red.addEventListener('click', (event) => handleButtonClick(event));
green.addEventListener('click', handleButtonClick);
blue.addEventListener('click', handleButtonClick);
yellow.addEventListener('click', handleButtonClick);

// click on start button
startButton.addEventListener('click', (event) => {
    play();
});

function play() {
    let randomNum = Math.floor(Math.random() * 4);
    correctPattern.push(randomNum);
    startButton.style.display = 'none';
    message.style.display = 'initial';
    message.innerText = 'Wait for the computer to finish';
    playNext(0);
}

function playNext(idx) {
    currentColor = correctPattern[idx];
    if(!currentColor) {
        gameStarted = true;
        message.innerText = 'Your turn';
        console.log('Fin');
        return;
    }

    const currentElement = document.getElementById(`color-${currentColor}`);
    currentElement.classList.add('active');
    sound(currentColor);
    setTimeout(() => {
        currentElement.classList.remove('active');
        playNext(idx + 1);
    }, 500);
}

function sound(colorNumber) {
    const audioName = './audio/simonSound' + colorNumber + '.mp3';
    let audio = new Audio(audioName);
    audio.play();
}

function handleButtonClick(e) {
    if(!gameStarted) return;
    const colorID = e.target.id;
    const colorNumber = Number(colorID.split('-')[1]);
    userPattern.push(colorNumber);

    sound(colorNumber);

    let fail = false;

    for (let i = 0; i < userPattern.length; i++) {
        if(correctPattern[i] !== userPattern[i]) {
            // message       1 - 2
            // mismo patron  2 - 1
            message.innerText = 'Wrong pattern, please try again.';
            setTimeout(() => {
                if(mode === 'easy') {
                    fail = true;
                    resetGame();
                    playNext(0);
                }
            }, 1000);
            break;
        }
    }
    if(userPattern.length === correctPattern.length && !fail) {
        // alert('success');
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
    console.log('clicker', colorNumber);
}

function nextLevel() {
    // Create a random num for the color pattern
    let randomNum = Math.floor(Math.random() * 4);
    correctPattern.push(randomNum);
    resetGame();
    playNext(0);
}

function resetGame() {
    message.innerText = 'Wait for the computer to finish';
    userPattern = [];
    gameStarted = false;
    startButton.innerText = 'Start';
}

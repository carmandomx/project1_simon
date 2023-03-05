
console.log('Live reloading');

// Asign html clases to JS variables
const red = document.getElementById('color-1');
const green = document.getElementById('color-2');
const blue = document.getElementById('color-3');
const yellow = document.getElementById('color-4');

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
    startButton.innerText = 'Wait for the computer to finish';
    playNext(0);
}

function playNext(idx) {
    currentColor = correctPattern[idx];
    if(!currentColor) {
        gameStarted = true;
        startButton.innerText = 'Your turn';
        console.log('Fin');
        return;
    }

    const currentElement = document.getElementById(`color-${currentColor}`);
    currentElement.classList.add('active');
    setTimeout(() => {
        currentElement.classList.remove('active');
        playNext(idx + 1);
    }, 500);
}

function handleButtonClick(e) {
    if(!gameStarted) return;
    const colorID = e.target.id;
    const colorNumber = Number(colorID.split('-')[1]);
    userPattern.push(colorNumber);

    let fail = false;

    for (let i = 0; i < userPattern.length; i++) {
        if(correctPattern[i] !== userPattern[i]) {
            alert('Fallo');
            
            break;
        }
    }
    if(userPattern.length === correctPattern.length && !fail) {
        alert('success');
        nextLevel();
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
    userPattern = [];
    gameStarted = false;
    startButton.innerText = 'Start';
}



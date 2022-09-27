// We need a empty array to store the secuence
let stgSquares = [];
// A variable to storage the rounds
let round = 0;
// A variable to helps us when comparing if we are pressing the correct button
let playerPatron = 0;
// An empty variable to storage and change the states depending what we need
let state = "";

// We add the audios into an array

const buttonSounds = [
    new Audio('./sounds/red.mp3'),
    new Audio('./sounds/green.mp3'),
    new Audio('./sounds/yellow.mp3'),
    new Audio('./sounds/blue.mp3')
];

// We get the elements from the html file


let title = document.getElementById('title');
let subtitle = document.getElementById('subtitle');
let red = document.getElementById('red');
let green = document.getElementById('green');
let yellow = document.getElementById('yellow');
let blue = document.getElementById('blue');
let start = document.getElementById('startBtn');
let reset = document.getElementById('resetBtn');


// Once we got the elements from the html file, then we storage the square buttons into an array

let squares = [red, green, yellow, blue];

reset.disabled = true;

start.addEventListener('click', function () {
    
    if (state === "nextLevel" || state === "reset") {
        // We set the state
        state = "waitingForPatron"
        // Then we call a function to start a new level
        newLevel();
        stgSquares = [];
        round = 0;
        playerPatron = 0;
        reset.disabled = false;

    }
});


//We create an event listener for the reset bttn and set variables to 0
reset.addEventListener('click', function () {
    state = "reset"
    newLevel();
    stgSquares = [];
    round = 0;
    playerPatron = 0;

});

// Then we create the ne level function 

function newLevel() {
    // We need to disable the start button so we can´t press it when the game starts
    start.disabled = true;
    // We required a set time function so that theres is a little delay everytime we change a level
    setTimeout(() => {
        // We refresh the round variable whenever a level changes, and then show it in the page
        round += 1;
        // For testing porpuses we added the rounds text since the user story 3, we forgot to remove when we pushed that user story
        subtitle.innerText = 'Round: ' + round;
        // Get a random number from 0 to 3 and storage in a variable
        let nextColor = Math.floor(Math.random() * 4);
        // Get a square button depending on the index of the last random number
        let nextSquare = squares[nextColor];
        // Then storage that button place into the secuence array
        stgSquares.push(nextSquare);
        playerPatron = 0;
        // We need a variable to look into the already stored buttons array
        let secuenceIndex = 0;
        // Then we storage in a variable a function that will make the secuence to be animated
        let timer = setInterval(() => {
            // A variable to select each button that is in the secuence array that has already been stored
            const btn = stgSquares[secuenceIndex];
            // Here is kind of assignation of a class for the selected button so that css can read that, and then apply the stuff in there.
            btn.classList.toggle('active');
            // Here's kind of the same bbut the difference is that with this one we can already animate the last buttons and so. 
            setTimeout(() => {
                btn.classList.toggle('active')
                // We get the sound from the sounds array depending of the index of the button already in the secuence
                soundPlace = squares.indexOf(btn);
                // then we play it
                buttonSounds[soundPlace].play();
            }, 250);
            // Secuence increments so that we can do the same for the new button in the secuence
            secuenceIndex += 1;
            // when the variale we used to check the secuence stored array is equal to the round, that means the array already finishes, so we close the timer we created before
            if (secuenceIndex >= round) {
                clearInterval(timer);
            }
        }, 500);
        state = "waitingForPlayer"
    }, 1000);
}

// Here we create the events for pressing each square button, so that we can use them by pushing them
red.addEventListener('click', squarePress);
green.addEventListener('click', squarePress);
yellow.addEventListener('click', squarePress);
blue.addEventListener('click', squarePress);

// We create the function for comparing if what we stored is the same of what we are actually input

function squarePress(event) {
    if (state === "waitingForPlayer") {
        // We get the button by asking it with the target
        var button = event.target;
        // Then we add the class to animate it when we press it
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active')
        }, 300);
        // If this button is equal to the button of the actual place of the secuence array, then we refresh the playerpatron variable.
        if (button === stgSquares[playerPatron]) {
            playerPatron += 1;
            // If  the player patron value is equal to the length of the secuence array, that means that we have pressed all the buttons of THE CURRENT LEVEL.
            // If true we say that it is good and then we add a level up
            if (playerPatron === stgSquares.length) {
                subtitle.innerText = 'Good, keep going!';
                newLevel();
            }
        }
        // Here if User inputs the wrong button, we show user that he failed and we call the repeat level function
        else {
            subtitle.innerText = 'You fail!'
            start.disabled = false;
            repeatLevel();
        }
        // Finally for this part we play the sound depending of the button we pressed
        soundPlace2 = squares.indexOf(button);
        buttonSounds[soundPlace2].play();
    }
}

// Here we create a function that repeats the level in case that user inputs the wrong button
// Here is almost the exactly function of next level but we use the last secuence used, that's it.
function repeatLevel() {
    start.disabled = true;
    setTimeout(() => {
        subtitle.innerText = 'Round: ' + round;
        playerPatron = 0;
        let secuenceIndex = 0;
        let timer = setInterval(() => {
            const btn = stgSquares[secuenceIndex];
            btn.classList.toggle('active');
            setTimeout(() => {
                btn.classList.toggle('active');
                soundPlace3 = squares.indexOf(btn);
                buttonSounds[soundPlace3].play();
            }, 250);
            secuenceIndex += 1;
            if (secuenceIndex >= round) {
                clearInterval(timer);
            }
        }, 500);
        state = "waitingForPlayer"
    }, 1000);
}
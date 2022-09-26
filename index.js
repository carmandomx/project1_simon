let stgSquares = [];
let round = 0;
let playerPatron = 0;
let state = "";

let title = document.getElementById('title');
let subtitle = document.getElementById('subtitle');
let red = document.getElementById('red');
let green = document.getElementById('green');
let yellow = document.getElementById('yellow');
let blue = document.getElementById('blue');
let start = document.getElementById('startBtn');

let squares = [red, green, yellow, blue];

start.addEventListener('click', function () {
    state = "waitingForPatron"
    newLevel();
    stgSquares = [];
    round = 0;
    playerPatron = 0;
});

function newLevel() {
    start.disabled = true;
    setTimeout(() => {
        round += 1;
        subtitle.innerText = 'Round: ' + round;
        let nextColor = Math.floor(Math.random() * 4);
        let nextSquare = squares[nextColor];
        stgSquares.push(nextSquare);
        playerPatron = 0;
        let secuenceIndex = 0;
        let timer = setInterval(() => {
            const btn = stgSquares[secuenceIndex];
            btn.classList.toggle('active');
            setTimeout(() => {
                btn.classList.toggle('active')
            }, 250);
            secuenceIndex += 1;
            if (secuenceIndex >= round) {
                clearInterval(timer);
            }
        }, 500);
        state = "waitingForPlayer"
    }, 1000);
}

red.addEventListener('click', squarePress);
green.addEventListener('click', squarePress);
yellow.addEventListener('click', squarePress);
blue.addEventListener('click', squarePress);

function squarePress(event) {
    if (state === "waitingForPlayer") {
        var button = event.target;
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active')
        }, 300);
        if (button === stgSquares[playerPatron]) {
            playerPatron += 1;
            if (playerPatron === stgSquares.length) {
                subtitle.innerText = 'Good, keep going!';
                newLevel();
            }
        }
    }
}











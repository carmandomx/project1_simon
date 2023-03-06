console.log('Live reloading')

//lets define all the constants
const turnCounter = document.querySelector("#turn");
const greenbtn = document.querySelector("#greenbtn");
const redbtn = document.querySelector("#redbtn");
const yellowbtn = document.querySelector("#yellowbtn");
const bluebtn = document.querySelector("#bluebtn");
const hardButton = document.querySelector("#chk");
const readybtn = document.querySelector("#ready");
const startButton = document.querySelector("#start");
const numberOfLevels = document.querySelector("#numlevels")
const numberOfSteps = document.querySelector("#stp")

//let's define all variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let hard = false;
let noise = true;
let on = false;
let win;
let levels = setLevels();

//This function allows to set the number of levels that the player wants to play each time, also this function doesn't allow text or nothing as an answer 
    function setLevels() {
        let levels = prompt("Please select the number of levels you want to play (20 by default)");
        document.querySelector("#numlevels").value = levels;
        while (levels == null || /\D/.test(levels) || levels == "") {
            levels = 20;
            document.querySelector("#numlevels").value = levels;}
        if (levels > 20) {
            levels = 20
            document.querySelector("#numlevels").value = levels;
        }
            else if (levels < 1){
                levels = 1
                document.querySelector("#numlevels").value = levels;
            }
            else {
                levels = numberOfLevels.value
            }
            return levels;
        }

 

//defines what will happen when the player click the button
hardButton.addEventListener('click', (event) => {
  if (hardButton.checked == true) {
    hard = true;
    chktxt.innerHTML = "Hard mode ON"
    startButton.innerHTML ="Start game in Hard Mode"
  } else {
    hard = false;
    chktxt.innerHTML = "Start in Hard Mode"
    startButton.innerHTML ="Start game"
  }
});
//defines what will happen when the player click the button
readybtn.addEventListener('click', (event) => {
  if (readybtn.checked == true) {
    on = true;
    turnCounter.innerHTML = "Yes, I am Ready!! Bring it!";
  } else {
    on = false;
    turnCounter.innerHTML = "I'm not feeling ready right now :(";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});
//defines what will happen in a turn
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = "You are in the level " + turn + " of " + levels;
  numberOfSteps.innerHTML ="Only 1 step in this turn"
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}
//this six functions defines the sounds of the game
function one() {
  if (noise) {
    let audio = document.getElementById("audio1");
    audio.play();
  }
  noise = true;
  greenbtn.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("audio2");
    audio.play();
  }
  noise = true;
  redbtn.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("audio3");
    audio.play();
  }
  noise = true;
  yellowbtn.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("audio4");
    audio.play();
  }
  noise = true;
  bluebtn.style.backgroundColor = "lightskyblue";
}

function fail() {
    if (noise){
        let audio = document.getElementById("audio5")
        audio.play()
    }
    noise = true;
}

function winner() {
    if (noise){
        let audio = document.getElementById("audio6")
        audio.play()
    }
    noise = true;
}
//restart the colors
function clearColor() {
  greenbtn.style.backgroundColor = "darkgreen";
  redbtn.style.backgroundColor = "darkred";
  yellowbtn.style.backgroundColor = "goldenrod";
  bluebtn.style.backgroundColor = "darkblue";
}
//enlight the colors to it look like a flash
function flashColor() {
  greenbtn.style.backgroundColor = "lightgreen";
  redbtn.style.backgroundColor = "tomato";
  yellowbtn.style.backgroundColor = "yellow";
  bluebtn.style.backgroundColor = "lightskyblue";
}
//defines what happens when the player hit a color square
greenbtn.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

redbtn.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

yellowbtn.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bluebtn.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
//check if the player make a bad choice
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == levels && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    fail();
    turnCounter.innerHTML = "EPIC FAIL!";
    setTimeout(() => {
      turnCounter.innerHTML = "You are in the level " + turn + " of " + levels;
      clearColor();

      if (hard) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = "You are in the level " + turn + " of " + levels;
    numberOfSteps.innerHTML = turn + " steps in this turn"
    intervalId = setInterval(gameTurn, 800);
  }

}
//defines what will happen when the player wins
function winGame() {
  flashColor();
  winner();
  turnCounter.innerHTML = "VICTORY ROYALE!";
  on = false;
  win = true;
}

// ------------------------- Seting audio effects ------------------------------------
const audioGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
audioGreen.autoplay = true;

const audioRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
audioRed.autoplay = true;

const audioYellow = new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
audioYellow.autoplay = true;

const audioBlue = new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
audioBlue.autoplay = true;

const audioStart = new Audio ("./media/sounds/button-start.mp3");
audioStart.autoplay = true;

// --------------------------- Setting var, arr, obj --------------------------------------
const state = {
    win: -1,
    lose: -2,
    start: false, //Indicates when the game is running
    userPlaying: 1, //When user is cliking
    computerPlaying: 2, //When computer is drawin the patterns
    finish: 3,
};

const buttons = ["green", "red", "yellow", "blue"];

//Setting selflight colors
const buttonsProperties = {
    green: {
        colorPressed: "#02ffd1",
        color: "#038C73",
        htmlElemt: document.querySelector("#b-green"),
        value: 1,
        init: function () {
            this.htmlElemt.addEventListener("click", function () { callBackSound(audioGreen) });
        }
    },
    red:  {
        colorPressed: "#f94d27",
        color: "#9a250a",
        htmlElemt: document.querySelector("#b-red"),
        value: 2,
        init: function () {
            this.htmlElemt.addEventListener("click", function () { callBackSound(audioRed) });
        }
    },
    yellow: {
        colorPressed: "#ffea06",
        color: "#8a7f09",
        htmlElemt: document.querySelector("#b-yellow"),
        value: 3,
        init: function () {
            this.htmlElemt.addEventListener("click", function () { callBackSound(audioYellow) });
        }
    },

    blue: {
        colorPressed:"#099df9",
        color: "#055b91",
        htmlElemt: document.querySelector("#b-blue"),
        value: 4,
        init: function () {
            this.htmlElemt.addEventListener("click", function () { callBackSound(audioBlue) });
        }
    },
};

const difficulty = {
    easy: "easy",
    normal: "normal",
    hard: "hard",
};

//Game settings
const game =  {
    level: 1,
    state: state.start,
    isStarted: false,
    difficulty: difficulty,
};

//Getting 1 random color to add...
function randomButtonColor(){
    const color =  buttons[Math.floor(Math.random() * 4)];
    const buttonColor =  buttonsProperties[color];
    return buttonColor;
}

//Basic function to make de pc highligh a rndon color
function computerPressRndColor(){
    const rndBtnColor = randomButtonColor();
    const { htmlElemt } = rndBtnColor; 
    htmlElemt.style.background =  rndBtnColor.colorPressed;
    setTimeout(()=>{
        htmlElemt.style.background = rndBtnColor.color;
    }, 250);
    console.log(htmlElemt);
};

function callBackSound(audioObj) {
    audioObj.load();
    audioObj.play();
};

//Initializing our colors to highligh
buttonsProperties.green.init();
buttonsProperties.red.init();
buttonsProperties.yellow.init();
buttonsProperties.blue.init();

//-----Setting events-----

const buttonGreen = document.querySelector("#b-green");
buttonGreen.addEventListener("click", function () { callBackSound(audioGreen) });
const buttonRed = document.querySelector("#b-red");
buttonRed.addEventListener("click", function () { callBackSound(audioRed) });
const buttonYellow = document.querySelector("#b-yellow");
buttonYellow.addEventListener("click", function(){ callBackSound(audioYellow)});
const buttonBlue = document.querySelector("#b-blue");
buttonBlue.addEventListener("click", function(){ callBackSound(audioBlue)});
const buttonStart = document.querySelector("#circle");

buttonStart.addEventListener("click", function(){ 
    callBackSound(audioStart);
    if (game.state) {
        game.state = false;
    } else {
        game.state = true;
    };
});
const menuStart = document.querySelector("#start");
menuStart.addEventListener("click", function(){ 
    callBackSound(audioStart);
    if (game.state) {
        game.state = false;
    } else {
        game.state = true;
    };
});

const easy = document.querySelector("#easy");
easy.addEventListener("click", function(){
    game.difficulty = difficulty.easy;
    console.log(game.difficulty)
});
const normal = document.querySelector("#normal");
normal.addEventListener("click", function(){
    game.difficulty = difficulty.normal;
    console.log(game.difficulty)
});
const hard = document.querySelector("#hard");
hard.addEventListener("click", function(){
    game.difficulty = difficulty.hard;
    console.log(game.difficulty)
});


let count = 0;

function main () {
    setTimeout( function () {
        console.log("Async Programming");
    }, 5000);

    //Async Programming like a for infinity loop without blocking my page.
    setInterval( function () {
        if (game.state) {
            computerPressRndColor(randomButtonColor());
        }

        // console.log(randomButtonColor());
    }, 1000 );
};

main();

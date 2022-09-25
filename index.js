const audioGreen = new Audio("./media/sounds/button-green-true.mp3");
audioGreen.autoplay = true;

const audioRed = new Audio("./media/sounds/button-red-true.mp3");
audioRed.autoplay = true;

const audioYellow = new Audio ("./media/sounds/button-yellow-true.mp3");
audioYellow.autoplay = true;

const audioBlue = new Audio ("./media/sounds/button-blue-true.mp3");
audioBlue.autoplay = true;

const audioStart = new Audio ("./media/sounds/button-start.mp3");
audioStart.autoplay = true;


function callBackSound(audioObj) {
    audioObj.load();
    audioObj.play();
}

const buttonGreen = document.querySelector("#b-green");
buttonGreen.addEventListener("click", function () { callBackSound(audioGreen) });
const buttonRed = document.querySelector("#b-red");
buttonRed.addEventListener("click", function () { callBackSound(audioRed) });
const buttonYellow = document.querySelector("#b-yellow");
buttonYellow.addEventListener("click", function(){ callBackSound(audioYellow)});
const buttonBlue = document.querySelector("#b-blue");
buttonBlue.addEventListener("click", function(){ callBackSound(audioBlue)});
const buttonStart = document.querySelector("#circle");
buttonStart.addEventListener("click", function(){ callBackSound(audioStart)});

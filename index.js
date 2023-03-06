let numClick = -1;
let userPattern = [];
let correctPattern = [];

let possibleColor = ["rojo", "azul", "verde", "amarillo"];
let rep=[];
let level = 0;
let ultimo=20;
const espera=750;
const esperaMedia=1000;
let continuar=false;
let hidden=false;
let reset=document.getElementById("reset");
let over=document.getElementById("gameOver");
document.getElementById('gameOver').disabled=false;

function botonClick(color) {
  numClick++;  
  clickAnimation("#" + color);
  playAudio(color);
  checkAnswer(color);
}

function checkAnswer(color) {
  userPattern.push(color);
  //checamos que este correcto
  if (color == correctPattern[numClick]) {
    if (userPattern.length == correctPattern.length) {
      setTimeout(function () {
        userPattern = [];
        numClick = -1;
        nextSequence();
      }, 1000);
    }
    
  } else {
    //si fallas
    $("h2").text("You are incorrect! Try again!");
    userPattern=[];
    numClick=-1;
    playAgain();

  }
}
function playAgain(){
    
    setTimeout(iluminarSecuencia, esperaMedia);
    setTimeout(function(){
       $("h2").text("Here we go!"); 
    },1000);
  
    
}


function nextSequence() {
if(level<ultimo) {
   level++;
  $("#level").text(level);
  let rand = Math.floor(Math.random() * 4);
  let color = possibleColor[rand];
  correctPattern.push(color);
  //clickAnimation("#" + color);  
  playAgain(); 
}else{

    $("h2").text("You are a rockstar!!");
    gameOver();
}
}

function resetButton(){
    level=0;
    $('#level').text(level);
    numClick=-1;
    userPattern=[];
    correctPattern=[];
    
}

function gameOver(){
    document.getElementById('gameOver').disabled=true;
    $('#level').text(level);
    level=0;
    numClick=-1;
    userPattern=[];
    correctPattern=[];
}

function playAudio(color) {
  let relPath = `sounds/${color}.mp3`;
  let audio = new Audio(relPath);
  audio.play();
}

function iluminarSecuencia(){
    for(var i=0;i<level;i++){
        let color=correctPattern[i];
        setTimeout(()=>{
            clickAnimation("#"+color);
            playAudio(color);
        },espera*i);
    }
}

function clickAnimation(id) {
   $(id).fadeOut(100).fadeIn(100);
}

function iniciarJuego() {
   
  if (level <= 0) {
    $("h2").text("The game begins!");
    nextSequence();
    
  }
}

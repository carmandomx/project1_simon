let state = 'begin';
let pattern = [];
let level = 0;
let indexplayerpatron = 0;
let mode = 'easy';
const title = document.getElementById('title');
const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const btnstart = document.getElementById('btnstart');
const btnrestart = document.getElementById('btnrestart');
const btnstarthard = document.getElementById('btnstarthard');
/* Setting of the inicial variables*/

const soundgreen= new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

const soundred= new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');

const soundyellow= new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

const soundblue= new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');



const button = [green,red,yellow,blue]
//listener to the start button
btnstart.addEventListener('click', starGame);
btnstarthard.addEventListener('click', starGamehard);

//listener to the restart button
btnrestart.addEventListener('click', resetgame);

//listeners for the color buttons
green.addEventListener('click', buttonpress);
red.addEventListener('click', buttonpress);
yellow.addEventListener('click', buttonpress);
blue.addEventListener('click', buttonpress);


function starGamehard(){ //Starts game in hard mode
    if(state==='begin'){
    mode = 'hard';
    newLevel();
    pattern = [];
    level = 0;
    indexplayerpatron = 0;
    }
}
function starGame(){ //Starts game in normal
    if(state==='begin'){
    mode = 'easy';
    newLevel();
    pattern = [];
    level = 0;
    indexplayerpatron = 0;
    }
}
function newLevel(){ // This function creates a new level
    state = 'waiting patron'
    setTimeout(()=>{
        if(level==21){
            title.innerText = 'You win!!!!!';
            state = 'begin';
        }
        level = level+1; // adds a new level if succeded in the excersice
        title.innerText = 'Nivel ' + level;
        let nextcolor = Math.floor(Math.random()*4) // sets a random color
        let nexbutton = button[nextcolor];
        lightbutton(nexbutton);
        pattern.push(nexbutton);
        indexplayerpatron = 0;
        state = 'waiting player';

    },500)
}

function lightbutton(color){ //This function lights the buttons in the order you should click them
        color.classList.add('active');
        setTimeout(()=>{
            color.classList.remove('active');
        },500)
        if(color == green){ //This conditionals make the sounds when the sequence is being showed
            soundgreen.play();
        }else if(color == red){
            soundred.play();          
        } else if(color == yellow){
            soundyellow.play();
        } else{
            soundblue.play();
        }
       }



function buttonpress(event){ //This function creates the actions when buttons are clicked
    console.log(event.target);
    if(state==='waiting player'){
        if(event.target == green){
            soundgreen.play();
        }else if(event.target == red){
            soundred.play();
        } else if(event.target == yellow){
            soundyellow.play();
        } else{
            soundblue.play();
        }
        let button = event.target;
        if(button ===pattern[indexplayerpatron]){
            indexplayerpatron = indexplayerpatron + 1;
            if(indexplayerpatron == pattern.length){
                newLevel();
            }
            
        } else {
            if(mode=='hard'){
                state = 'begin';
                title.innerText = 'Game over :(';
            }else{
                indexplayerpatron = 0;
                title.innerText = 'Error';
                setTimeout(()=>{
                    title.innerText = 'Nivel ' + level;
                },1000)
                buttonpress();
                
            }
        }
    }
}

function resetgame(){
    state = 'begin';
    title.innerText = 'Simon Says!';
}
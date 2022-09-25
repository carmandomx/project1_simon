console.log('Live reloading')

//sleep function
function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve, ms));
}

//Function that returns a random number between the specified values.
//The return value will not be lower than "min" , and will be less than (but not equal to) "max"
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

//Selecting the buttons
const start = document.querySelector('#buttonStart_id');
const red_1 = document.querySelector('#red_1');
const green_2 = document.querySelector('#green_2');
const blue_3 = document.querySelector('#blue_3');
const yellow_4 = document.querySelector('#yellow_4');

//this variable stores the user's responses for each click
var userAnswerClick;

//This function is to wait and receive user responses
function userAnswer(){
    
    red_1.addEventListener('click',async function () {
            userAnswerClick=1;
            red_1.setAttribute('class','pattern_select_red');
            await sleep(200); 
            red_1.setAttribute('class','red');
        });

    green_2.addEventListener('click',async function () {
            userAnswerClick=2;
            green_2.setAttribute('class','pattern_select_green');
            await sleep(200);   
            green_2.setAttribute('class','green'); 
        });

    blue_3.addEventListener('click',async function () {
            userAnswerClick=3;
            blue_3.setAttribute('class','pattern_select_blue');
            await sleep(200); 
            blue_3.setAttribute('class','blue'); 
        });

    yellow_4.addEventListener('click',async function () {
            userAnswerClick=4;
            yellow_4.setAttribute('class','pattern_select_yellow');
            await sleep(200);  
            yellow_4.setAttribute('class','yellow');
        });

    //This promise is necessary to prevent the general function of the game from continuing to progress without waiting for the user's response
    const promise = new Promise((resolve) => {
            red_1.addEventListener('click', resolve)
            green_2.addEventListener('click', resolve)
            blue_3.addEventListener('click', resolve)
            yellow_4.addEventListener('click', resolve)
            })
            return  promise;          
}

//The game starts when you click "start"
start.addEventListener('click',async function () {

    

    //This array will save the answers of the 20 levels
    const answers = [];

    //we create the answers for the 20 levels
    for(i=0; i < 20; i++) answers[i]= getRandomInt(1, 5)
   
    //The game starts here

    //"i" is the level
    i =0;
    //This "while" prevents us from going over 20 levels
    while( i < 20 ){
    
        //This "for" shows the pattern to enter (its limit is the level reached)
        for(j =0; j<=i; j++){
            console.log(j);

            switch (answers[j]){
                case 1:
                red_1.setAttribute('class','pattern_select_red');
                await sleep(500); 
                red_1.setAttribute('class','red');
                break;

                case 2:
                green_2.setAttribute('class','pattern_select_green');
                await sleep(500);   
                green_2.setAttribute('class','green'); 
                break;

                case 3:
                blue_3.setAttribute('class','pattern_select_blue');
                await sleep(500); 
                blue_3.setAttribute('class','blue'); 
                break;

                case 4:
                yellow_4.setAttribute('class','pattern_select_yellow');
                await sleep(500);  
                yellow_4.setAttribute('class','yellow');
                break;

                default:
                break;
            }


            await sleep(500);
        }

        
        //This "for" evaluates the user's response
        for(j =0; j<=i; j++){

            //We wait for the user's response
             await userAnswer();
             
             //If the user makes a mistake in any step, the "for" is broken without having leveled up
             if(userAnswerClick != answers[j])break;
            
             //If the user reaches the last step, he levels up!
             if(j==i){
                i++; //level up
                break;

             }  

        }
        await sleep(1000);

    }
 
 });

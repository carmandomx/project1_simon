//Create a CLASS to work with simonSays

class  SimonSays{
    
    constructor (){    
    }
    winSound = new Audio("./audio/winSound.mp3");
    failSound = new Audio("./audio/error.wav");
    getSounds = [
            new Audio ("./audio/1.mp3"),
            new Audio ("./audio/2.mp3"),
            new Audio ("./audio/3.mp3"),
            new Audio ("./audio/4.mp3")
    ];

    pattern=0;
    step=0;
    patternArray=[];
    round = 0;
    totalRounds = 20;
    contStep = 0;
    
    
    pressButton(elem){
        if(elem.disabled){
            return false;
        } else{
            console.log(elem.id);
            this.checkColor(this.getButtonNumber(elem));
        }
        
    }

    createRandomPattern(){
        for(let i=0;i<20;i++){
            this.patternArray.push(this.getRandomIn(0,3));
        }
        return this.patternArray;
    }

    showPattern(){
        setTimeout( () => document.querySelector('#ContStep').innerHTML = "Wait for the computer",  500)
        this.ableButtons();
        let index=0;
        document.querySelector('#round').innerHTML = this.step + 1;
       /*  document.querySelector('#round2').innerHTML = this.step + 1; */
        let patternTimer = setInterval(() => {
            const button = this.getButton(this.patternArray[index]);
            this.activateButton(button);
            this.playSoundButton(this.patternArray[index]);
            setTimeout( () => this.activateButton(button),  500)
            index++;
            if (index > this.step) {
                clearInterval(patternTimer);
            }
        }, 1000);
        
        

    }

    disableButtons(){
        for(let i=0;i<4;i++){
            this.getButton(i).setAttribute('disabled', true);
        }
    }

    ableButtons(){
        
        for(let i=0;i<4;i++){
            this.getButton(i).removeAttribute('disabled');
        }
    }

    
    activateButton(button){
        button.classList.toggle('active');

    }

    checkColor(color){
        if(this.patternArray[this.pattern]===color){
            this.playSoundButton(this.patternArray[this.pattern]);
            this.contStep +=1;
            let currentRound = this.step + 1; 
            document.querySelector('#ContStep').innerHTML = "Your Turn: " + this.contStep + " / " + currentRound;
            if(this.step===this.pattern){
                this.step=this.step+1;
                this.contStep = 0;
                this.resetPattern();
            }else{
                this.pattern++;
            }
        }else{
            document.querySelector('#ContStep').innerHTML = "Try again";
            this.playWrongButton();
            this.resetPattern();
        }

    }

    playSoundButton(color){
        this.getSounds[color].play();

    }
    playWrongButton(){
        this.failSound.play();
    }

    getRandomIn (min, max){ 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    startPlay(){
        this.createRandomPattern(); 
        this.showPattern();
        document.querySelector('#startButton').setAttribute("hidden",true);
        document.querySelector('#startOverButton').removeAttribute("hidden");
        
    }

    startOver(){
        this.pattern=0;
        this.step=0;
        this.patternArray=[];
        this.round = 0;
        this.contStep = 0;
        this.createRandomPattern(); 
        this.showPattern();
        document.querySelector('#round').innerHTML = this.step ;
    }

    endGame(){
        this.pattern=0;
        this.step=0;
        this.patternArray=[];
        this.round = 0;
        this.contStep = 0;
        document.querySelector('#round').innerHTML = this.step ;
        document.querySelector('#startOverButton').setAttribute("hidden",true);
        document.querySelector('#startButton').removeAttribute("hidden");
        document.querySelector('#ContStep').innerHTML="";
        alert('Game Ended');
    }

    getButton(number){
        switch(number){
            case 0: return document.querySelector('#buttonsqrgreen');
            case 1: return document.querySelector('#buttonsqrred');
            case 2: return document.querySelector('#buttonsqryellow');
            case 3: return document.querySelector('#buttonsqrblue');
            default: return 0;
        }

    }

    getButtonNumber(elem){
        switch(elem.id){
            case 'buttonsqrgreen': return 0;
            case 'buttonsqrred': return 1;
            case 'buttonsqryellow': return 2;
            case 'buttonsqrblue': return 3;
            default: return -1;
        }

    }

    resetPattern(){
        this.pattern=0;
        this.contStep = 0;
        this.showPattern();
    }

    


}

const simon = new SimonSays();
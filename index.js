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
    
    finished() {// FUCTION TO CALL TO THE WINNER MODAL DISPLAY
        var modal = document.querySelector("#myModal");
        this.winSound.play();
        setTimeout(() => { modal.style.display = "block";}, 250);  
    }

    playAgain(){ //FUCTION TO CALL THE MODAL FOR PLAY AGAIN IF THE PLAYER CLICK 'END BUTTON'
        var modal = document.querySelector("#myModalPlayAgain");
        modal.style.display = "block";
        
        //we make a countdown for restar the game
        var timeleft = 3;
        var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            location.reload();
        }
        document.querySelector('#Timer').innerHTML = timeleft; //WRITTING THE COUNTDOWN IN HTML
        timeleft -= 1;
        }, 1000); 
 
    }
    
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
        this.ableButtons();
        let index=0;
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
            if(this.step===this.pattern){
                this.step=this.step+1;
                this.resetPattern();
            }else{
                this.pattern++;
            }
        }else{
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
        this.showPattern();
    }

    


}

const simon = new SimonSays();
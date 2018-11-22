// game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI elements
const UIgame = document.getElementById('game'),
      UIminNum = document.querySelector('.min-num'),  
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

// assign UI min and max 
UIminNum.textContent = min;
UImaxNum.textContent = max;

//play again EventListenar
UIgame.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload()
    }
})

//Listen for guess
UIguessBtn.addEventListener('click', function(){
    let guess = parseInt(UIguessInput.value)
    
    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }
    else {
        //check if Win
        if(guess === winningNum){
            //Disable Input
            UIguessInput.disabled = true;
            //change border color
            UIguessInput.style.borderColor = 'green'
            // set message
            setMessage(`${winningNum} is correct, YOU WON!`, 'green')
            //Play again
            UIguessBtn.value = 'Play Again'
            UIguessBtn.className += 'play-again'
            
        }
        else{
            guessesLeft--
            if(guessesLeft){
                if(guess > winningNum){
                    //change border color
                    UIguessInput.style.borderColor = 'red'
                    //set message
                    setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left! TOO HIGH!`, 'red')
                    //Clear Input
                    UIguessInput.value = ""
                }
                else{
                    //change border color
                    UIguessInput.style.borderColor = 'red'
                    //set message
                    setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left! TOO LOW!`, 'red')
                    //Clear Input
                    UIguessInput.value = ""
                }
            }
            else{
                //Disable Input
                UIguessInput.disabled = true;
                //change border color
                UIguessInput.style.borderColor = 'red'
                setMessage(`Game Over, You Lost! The correct number was ${winningNum}`, 'red')
                //Play again
                UIguessBtn.value = 'Play Again'
                UIguessBtn.className += 'play-again'
            }
            
        }
    }    
})
//Get Random Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min) + 1)
}
//Set Message
function setMessage(msg, color){
    UImessage.style.color = color;
    UImessage.textContent = msg;
}
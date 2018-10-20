/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct number if loose
- Let player choose to play again
*/

// game values
let guessesLeft = 5;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message'),
      minNumSelect = document.querySelector('#min-select');
      maxNumSelect = document.querySelector('#max-select'),
      totalGuess = document.querySelector('.total-guess');

totalGuess.textContent = guessesLeft;

let winningNum;
let min, max;

minNumSelect.addEventListener('change', function(){
    minNum.textContent = minNumSelect.value;
    setMessage('');
});

maxNumSelect.addEventListener('change', function () {
    maxNum.textContent = maxNumSelect.value;
    winningNum = getRandomNum(Number(minNum.textContent), Number(maxNum.textContent));
    setMessage('');
    console.log(winningNum);
});

// play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate 
    if(minNum.textContent !== '_' && maxNum.textContent !== '_') {

        if (isNaN(guess) || guess < Number(minNumSelect.value) || guess > Number(maxNumSelect.value)) {
            setMessage(`Please enter a number from ${Number(minNum.textContent)} and ${Number(maxNum.textContent)}`, "red");
        } else {
            // check if won
            if (guess === winningNum) {
                // game over - won

                gameOver(true, `${winningNum} is correct, YOU WIN!`);
            } else {
                // wrong guess
                guessesLeft -= 1;

                if (guessesLeft === 0) {
                    // game over - lost

                    gameOver(false, `Game Over, YOU LOST. The correct number was ${winningNum}.`);
                } else {
                    // game continues - answer wrong

                    // change border color
                    guessInput.style.borderColor = "red";

                    // clear input
                    guessInput.value = "";

                    // tell user its the wrong number
                    setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
                }
            }
        }
    } else {
        setMessage('First Select Min and Max Number', 'red');
    }
});

// game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // clear input
    guessInput.value = '';
    // change placeholder
    guessInput.placeholder = 'Game Over ...'
    // set message
    setMessage(msg);

    // play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

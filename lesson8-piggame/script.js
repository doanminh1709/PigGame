'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const playerActive = document.querySelector('.player--active');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//set value scroe equals zero 
let scores;
let activePlayer;
let currentScore;
let playing;

const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = () => {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; ``
    //Switch to next player (check if exists delete)
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//Roll dice 
btnRoll.addEventListener('click', function () {

    if (playing === true) {
        diceEl.classList.remove('hidden');
        //1.Generate a random dice roll 
        const luckyNumber = Math.trunc(Math.random() * 6) + 1;
        console.log('luckyNumber' + luckyNumber);
        //2.Display dice 
        diceEl.setAttribute('src', `./images/dice-${luckyNumber}.png`);
        // diceEl.src = `./images/dice-${luckyNumber}.png`;
        // Check for rolled 1 
        if (luckyNumber !== 1) {
            currentScore += luckyNumber;
            document.getElementById(`current--${activePlayer}`)
                .textContent = currentScore;
        } else {
            document.getElementById(`score--${activePlayer}`).textContent = 0;
            scores[activePlayer] = 0;
            switchPlayer();
        }
    }
})

//Hold game 
btnHold.addEventListener('click', function () {
    if (playing === true) {
        //1.Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent
            = scores[activePlayer];

        //2.Check if player's score >= 100
        if (scores[activePlayer] >= 100) {
            //End game 
            playing = false;
            document.querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document.querySelector(`.player--active${activePlayer}`)
                .classList.remove('player--active');
        }
        //Switch to the next player 
        else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);

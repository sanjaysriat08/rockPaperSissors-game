let score = JSON.parse(localStorage.getItem('score')) || { Wins:0, Losses:0,Ties:0};

document.querySelector('#score').innerHTML = `Wins : ${score.Wins} ,Losses : ${score.Losses} ,Ties : ${score.Ties}` ;

let computerMove = '';

function playGame(playerMove) {

    const computerMove = generateComputerMove();
    let result = '';
    
    if(playerMove === '✊') {          //Rock

        if(computerMove === '✊') {
            result = 'Tie .' ;
        }
        else if(computerMove === '✋') {
            result = 'You Lose !' ;
        }
        else if(computerMove === '✌️') {
            result = 'You Win !' ;
        }
    }
    else if(playerMove === '✋') {      //Paper

        if(computerMove === '✊') {
            result = 'You Win !' ;
        }
        else if(computerMove === '✋') {
            result = 'Tie .' ;
        }
        else if(computerMove === '✌️') {
            result = 'You Lose !' ;
        }
    }
    else if(playerMove === '✌️') {        // Sissors

        if(computerMove === '✊') {
            result = 'You Lose !' ;
        }
        else if(computerMove === '✋') {
            result = 'You Win !' ;
        }
        else if(computerMove === '✌️') {
            result = 'Tie .' ;
        }
    }

    if(result === 'You Win !') {
        score.Wins += 1;
    }
    else if(result === 'You Lose !') {
        score.Losses += 1;
    }
    else if(result === 'Tie .') {
        score.Ties += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    //alert(`Your move Rock , Computer move ${computerMove} , ${result}`);

    document.getElementById('moves').innerHTML = `Your Move ${playerMove} , Computer Move ${computerMove}`;
    document.getElementById('result').innerHTML = `${result}`;
    document.getElementById('score').innerHTML = `Wins : ${score.Wins} ,Losses : ${score.Losses} ,Ties : ${score.Ties}`;

}

function generateComputerMove() {

    const randomNumber = Math.random() ;
    let computerMove = '';

    if(randomNumber>=0 && randomNumber<1/3) {

        computerMove = '✊';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3) {

        computerMove = '✋';
    }
    else if(randomNumber>=2/3 && randomNumber<=1) {

        computerMove = '✌️';
    }

    return computerMove;
}

function resetScore() {

    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    localStorage.removeItem('score');
    document.getElementById('score').innerHTML = `Wins : ${score.Wins} ,Losses : ${score.Losses} ,Ties : ${score.Ties}`;
}

let autoPlayStatus = false;
let intervalId;

function autoPlay() {
    
    if(!autoPlayStatus) {

        intervalId = setInterval(function() {
            let playerMove = generateComputerMove();
            playGame(playerMove);
        },1000);

        autoPlayStatus = true;

        document.querySelector('.autoPlay-Button').innerHTML = 'Stop';

    }
    else {

        clearInterval(intervalId);
        autoPlayStatus = false;
        document.querySelector('.autoPlay-Button').innerHTML = 'Auto Play';
    }
}
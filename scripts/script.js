var quiz = [["Which option is NOT a data type?", "Number", "String", "Condition", "Object", "3"], 
            ["Which symbol is used for comments in JavaScript?", "*", "&", "//", "|", "3"],
            ["What is === operator?", "Strict Equality", "Lazy Equality", "Child Equality", "Type Equality", "1"],
            ["What is NOT a type of Popup box in JavaScript?", "Alert", "Surprise", "Confirm", "Prompt", "2"],
            ["How do you remove the last element in an array?", "shift()", "slide()", "stash()", "pop()", "4"]];
var questionEl = document.querySelector("#question");
var answerContainer = document.getElementById("answerContainer");
var recordScoreEl = document.getElementById("recordScore");
var scoreEl = document.getElementById("score");
var ruleEl = document.getElementById("rule");
var responseEl = document.getElementById("response");
var submitBtn = document.getElementById("submitScore");
var timerEl = document.getElementById("time");
var questionNum = 0;
var totalScore = 0;
var highScores = [];
var interval;
var timer = 75;

initHighScores();

submitBtn.addEventListener("submit", submitHighScore);

function initHighScores(){
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    if(storedScores){
        highScores = storedScores;
    }
    showQuestion();
    timerEl.textContent = timer;
    interval = setInterval(countDown, 1000);
}

function showQuestion(){
    ruleEl.setAttribute("style", "display: none;");
    responseEl.setAttribute("style", "display: none;");
    questionEl.textContent = quiz[questionNum][0];
    answerContainer.innerHTML = "";
    answerContainer.addEventListener("click", answerSelection);
    for(var i = 1; i < quiz[questionNum].length-1; i++){
        var divEl = document.createElement("div");
        divEl.setAttribute("id", i.toString());
        divEl.setAttribute("class", "badge");
        // divEl.setAttribute("style", "background-color: purple; color: white; cursor: pointer;");
        divEl.textContent = i.toString() + ". " + quiz[questionNum][i];
        var breakEl = document.createElement("br");
        answerContainer.appendChild(divEl);
        if(i < quiz[questionNum].length-2){
            answerContainer.appendChild(breakEl);
        }
    }
}

function answerSelection(event){
    var questionLen = quiz[questionNum].length-1;
    event.stopPropagation();
    ruleEl.removeAttribute("style", "display: none;");

    if(event.target.id === quiz[questionNum][questionLen]){
        responseEl.textContent = "Correct!";
        totalScore += 11;
    }else{
        responseEl.textContent = "Wrong!";
        timer -= 10;
    }
    responseEl.removeAttribute("style", "display: none;");
    if(questionNum < quiz.length-1){
        questionNum++;
        showQuestion();
    }else{
        gameOver();
    }
}

function gameOver(){
    timerEl.textContent = 0;
    clearInterval(interval);
    questionEl.textContent = "Game Over!";
    answerContainer.setAttribute("style", "display: none;");
    ruleEl.setAttribute("style", "display: none;");
    responseEl.setAttribute("style", "display: none;");
    scoreEl.textContent = totalScore;
    recordScoreEl.removeAttribute("style", "display: none;");
}

function submitHighScore(event){
    event.preventDefault();
    // event.stopPropagation();
    var initials = document.getElementById("initials");
    highScores.push({player: initials.value, score: totalScore});
    highScores.sort(function(a, b){return b.score - a.score});
    localStorage.setItem("highscores", JSON.stringify(highScores));
    window.location.replace("highscores.html");
    return false;
}

function countDown(){
    --timer;
    timerEl.textContent = timer;
    if(timer <= 0){
        
        gameOver();
    }
}
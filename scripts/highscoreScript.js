var scoreListEl = document.getElementById("scoreList");
var backBtn = document.getElementById("back");
var clearBtn = document.getElementById("clear");

loadHighScores();

function loadHighScores(){
    var highScores = JSON.parse(localStorage.getItem("highscores"));

    for(var i = 0; i < highScores.length; i++){
        var score = document.createElement("li");
        score.setAttribute("style", "background-color: lightskyblue;");
        score.textContent = highScores[i].player + " - " + highScores[i].score;
        scoreListEl.appendChild(score);
    }
}

backBtn.addEventListener("click", function(){
    window.location.replace("index.html");
});

clearBtn.addEventListener("click", function(){
    scoreListEl.innerHTML = "";
    localStorage.removeItem("highscores");
    window.location.replace("index.html");
});
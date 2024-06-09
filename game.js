var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;

// colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Game starting 
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

// generates a random color
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    // generates a random color
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//To play a sound
function playSound(color){
    var audio=new Audio("./sounds/"+color+".mp3")
    audio.play();
}

// Click detection and pushing into userClickedPattern
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(this);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// Click animation
function animatePress(x){
    $(x).addClass("pressed");
    setTimeout(function () {
        $(x).removeClass("pressed");
    }, 100);
}

// Checking the pattern
function checkAnswer(levelnumber){
    if(userClickedPattern[levelnumber]===gamePattern[levelnumber]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function (){
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
}

// Startover function
function startover(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}
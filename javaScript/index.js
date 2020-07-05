var buttonColor = ["green","red","blue","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").html("Level "+level);
        newSequence();
        started=true;
    }
});


    $(".btn").click(function(){
        var userColor = $(this).attr("id");
        userClickedPattern.push(userColor);
        $("#"+userColor).addClass("pressed");
        setTimeout(function(){
            $("#"+userColor).removeClass("pressed")}, 100
        );
        var audio = new Audio("sounds/"+userColor+".mp3");
        audio.play();
        checkAnswer(userClickedPattern.length-1);
    });

    function newSequence(){
        level++;
        userClickedPattern = [];
        $("#level-title").html("Level "+level);
        var randomNumber = Math.floor(Math.random()*4);
        //console.log(randomNumber);
        var randomColor = buttonColor[randomNumber];
    
        gamePattern.push(randomColor);
        //console.log(gamePattern);
        var fadeColor = $("#"+randomColor);
        fadeColor.fadeIn(100).fadeOut(100).fadeIn(100);
        var audio = new Audio("sounds/"+randomColor+".mp3");
        audio.play();
       
    }
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       // console.log("right");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                 newSequence();
            }, 1000);
           
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")}, 100
        );
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").html("Game over, Press a key to start over!");
        startOver();

    }
}

function startOver(){
    started = false;
    level = 0 ;
    gamePattern=[];
    
}
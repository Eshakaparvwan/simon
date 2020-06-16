var level=0;    
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
function animatePress(currentColour)
{
        $("#" + currentColour).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed");      
        }, 100);
        
    
}


function playSound(name)
{
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function(){
        
    var userChosenColour=$(this).attr("id");
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})
var i=false;
$(document).keypress(function(){
    
    if(!i)
    {
         nextSequence();
         i=true;
            
     }
    
    
})


function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $(
        "#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        // animatePress(randomChosenColour);
        $("h1").text("Level " + level);
        level=level+1;
      

  }


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("sucesss");
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            },200);
        $("#level-title").text("GAME OVER! Press A key to Restart");
        startOver();  
    }
    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
    
}
function startOver()
{
    level=0;
    gamePattern=[];
    i=false;
}
//Array of buttons defined by their colors
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

// event listener for first key stroke
$(document).keypress(function (){
  // so this only calls nextSequence() the first time
  if (!started){
    // this will change the title value to "level" + the level their own
    $("#level-title").html("level " + level);
    nextSequence();
    // this will prevent the game from restarting ever keypress
    started = true;
  }
});

// event listener for all buttons
$(".btn").click(function(){
  // the chosen color is the = to the id of the botton clicked
  var userChosenColor = $(this).attr("id");
  //the color of the botton clicked is pushed to the userClickedPattern array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // checks the last element
  checkAnswer(userClickedPattern.length - 1)
});

// Creates the next part of the sequence randomly
function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").html("level " + level);

  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  //select the chosen collor tile and make it fade in and out
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }} else {
      playSound('wrong');
      // change the background
      $("body").addClass("game-over");
      // change the h1
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1000);
      $("h1").html("Game Over, Press Any Key to Restart")
      startOver();
    }
}

// plays audio that corresponds to which tile is clicked!
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  // turns on the annimation
  $("#" + currentColor).addClass('pressed');

  // 100 ms after the animation is turned on, this function turns it off.
  setTimeout(function(){
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}

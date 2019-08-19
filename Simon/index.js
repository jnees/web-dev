
// Part 1: Global Vars, Helper Functions, Dictionaries

// 1a. Global Variables
var started = false;
var level = 0;
var click_count = 0;
var randomChosenColor = "";

// 1b. Dictionaries
var buttonColors = ["red", "blue", "green", "yellow"];


var buttonSounds = {"red": 'sounds/F3.wav',
                "blue": 'sounds/C4.wav',
                "green": 'sounds/Csharp4.wav',
                "yellow": 'sounds/F4.wav'};

// 1c. Helper Functions

// CPU and Player Patterns
var gamePattern = [];
var userClickedPattern = [];

// CPU Random button chooser
function next_sequence() {

  // Pick next sequence
  let rand_square = Math.random() * 4;
  rand_square = Math.floor(rand_square);
  return rand_square;
}

// Animate and Play Sound on Buttons
function playButton(color) {
  $("#" + color).addClass("pressed").fadeOut(20).fadeIn(90);

  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);

  var audio = new Audio(buttonSounds[color]);
  audio.play();
  }

// check answer function
function checkAnswer(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

//level up
function levelUp(){
  level++;
  $("#level-title").text("Level " + level);
}

function gameOver(){
  console.log("game-over");
  // update Vars
  started = false;
  resetUserPattern();
  resetGamePattern();

  // game over sound
  gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.volume = 0.20;
  gameOverSound.play();

  // game over animations
  $("#level-title").text("Game Over!");
  $("body").css("background", "red");
  $("body").css("opacity", ".4");
  setTimeout(function() {
    $("body").css("background", "#011F3F");
    $("body").css("opacity", "1");
  }, 80);
  setTimeout(function() {
    $("#level-title").text("Press any key to restart");
  }, 1200);
}

// Reset Pattern Functions

function resetGamePattern(){
  while(gamePattern.length > 0) {
    gamePattern.pop();
  }
}

function resetUserPattern (){
  while(userClickedPattern.length > 0) {
    userClickedPattern.pop();
  }
}


// Part 2: Main Game
function game(){
  $(".button").off();
  started = true;
  level = 0;

function round(){
  // update round display
  resetUserPattern();
  levelUp();

  //reset userClickedPattern
  click_count = 0;

  // add a new random color to gamePattern array
  randomChosenColor = buttonColors[next_sequence()];
  gamePattern.push(randomChosenColor);

  // loop through game pattern and play buttons.
  gamePattern.forEach(function(obj, index) {
    setTimeout(function(){
      playButton(gamePattern[index]);
    }, 800 * (index + 1));
  });
}

setTimeout(round(), 1000);

  //button click event listener
    $(".button").on("click",(function() {
      click_count++;
      userChosenColor = this.id;
      playButton(userChosenColor);
      userClickedPattern.push(userChosenColor);
      if (click_count == level) {
        var correct_answer = checkAnswer(gamePattern, userClickedPattern);
        if (correct_answer) {
          setTimeout(round, 1000);
        }
        if (!correct_answer) {
          gameOver();
        }
      }
    }));
  }

// Part 3: Game Start
function start_game(){
  if (!started){
    game();
  }
}

document.addEventListener("keypress", start_game);


//TODO LIST:
//1b. Make Game Over Sound game-over event.
//2. MAKE AWESOME INTRO MUSIC!
//3. ANIMATE background
//4. SOUND EFFECT ON CORRECT ANSWER

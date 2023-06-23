// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the game pattern and user's clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Variables to track game state
var started = false;
var level = 0;

// Event handler for keypress to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Event handler for button clicks
$(".btn").click(function() {
  // Get the color of the clicked button
  var userChosenColour = $(this).attr("id");
  // Add the color to the user's clicked pattern
  userClickedPattern.push(userChosenColour);

  // Play the corresponding sound and animate the button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the user's pattern matches the game pattern
  checkAnswer(userClickedPattern.length-1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the current step in the patterns match
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user has completed the current level
    if (userClickedPattern.length === gamePattern.length){
      // Wait for a second and proceed to the next level
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // User's pattern is incorrect

    // Play the "wrong" sound
    playSound("wrong");
    // Add a CSS class to indicate game over
    $("body").addClass("game-over");
    // Update the level title to indicate game over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove the CSS class after a short delay
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Restart the game
    startOver();
  }
}

// Function to generate the next sequence
function nextSequence() {
  // Reset the user's clicked pattern
  userClickedPattern = [];
  // Increment the level and update the level title
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Get a random color from the buttonColours array
  var randomChosenColour = buttonColours[randomNumber];
  // Add the color to the game pattern
  gamePattern.push(randomChosenColour);

  // Show the chosen color by fading it in and out
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the corresponding sound
  playSound(randomChosenColour);
}

// Function to animate button press
function animatePress(currentColor) {
  // Add a CSS class to indicate button press
  $("#" + currentColor).addClass("pressed");
  // Remove the CSS class after a short delay
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play a sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to start over the game
function startOver() {
  // Reset the level, game pattern, and game state
  level = 0;
  gamePattern = [];
  started = false;
}

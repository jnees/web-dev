var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ball size and starting location
var x = canvas.width/2;   //center of ball x
var y = canvas.height + -70;  //center of ball y
var ballRadius = 10;

// ball movement vars
var dx = 3.0;
var dy = -3.0;

// paddle draw vars
paddleHeight = 18;
paddleWidth = 140;
paddleX = (canvas.width - paddleWidth)/2;
paddleGap = 0;

// paddle movement
var paddleDx = 5;

var leftPressed;
var rightPressed;

// Controller Event Handlers
function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }
  else if (event.keyCode == 37) {
    leftPressed = true;
  }

  if(event.keyCode == 83) {
    buySlow();
  }

  if(event.keyCode == 70) {
    buyFasterPaddle();
  }

  if(event.keyCode == 87){
    buyWiderPaddle();
  }

  if(event.keyCode == 84){
    buyInterestRate();
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

// Controller Event listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Scoring
function scoreUpdate() {
  score += 1;
  document.getElementById("score-board").innerText = score;
  scorePossible = false;
}

// Cash Management

function displayBalance(){
  document.getElementById("currentBalance").innerText = "Bank: " + currentBalance;
}

function displayInterest() {
  document.getElementById("interestRate").innerText = "Interest Rate: " + interestRate + "%";
}

function updateCash(){
  var interestEarned = currentBalance * (interestRate/100);
  currentBalance = parseFloat(currentBalance + interestEarned + 1);
  currentBalance = parseFloat(currentBalance.toFixed(2));
  displayBalance();
}

// Shopping functions
function buySlow(){
  if (currentBalance >= 7){
    currentBalance -= 7;
    currentBalance = parseFloat(currentBalance.toFixed(2));
    displayBalance();
    dx *= 0.65;
    dy *= 0.65;
  }
}

function buyWiderPaddle() {
  if (currentBalance >= 5){
    currentBalance -= 5;
    currentBalance = parseFloat(currentBalance.toFixed(2));
    displayBalance();
    paddleWidth += 25;
  }
}

function buyFasterPaddle() {
  if (currentBalance >= 14){
    currentBalance -= 14;
    currentBalance = parseFloat(currentBalance.toFixed(2));
    displayBalance();
    paddleDx += 3;
  }
}

function buyInterestRate() {
  if (currentBalance >= 18){
    currentBalance -= 18;
    currentBalance = parseFloat(currentBalance.toFixed(2));
    displayBalance();
    interestRate += 1;
    displayInterest();
  }
}


// Rendering
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddleX, canvas.height - paddleHeight - paddleGap, paddleWidth, paddleHeight);
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath();
}

function shrinkPaddle() {
  if (paddleWidth > 25) {
    paddleWidth -= 1;
  }
}

// Visual Effects
function flashElement(ms, element){
  document.querySelector(element).style.boxShadow = "0 0 15px 0 rgba(220, 220, 220, 0.1), 0 0 15px 0 rgba(255, 255, 255, 0.1)";
  setTimeout(function() {
    document.querySelector(element).style.boxShadow = "0px 0px 10px rgba(0, 0 , 0, 0.2)";
  }, ms);
}

function flashElementText(ms, element){
  document.querySelector(element).style.textShadow = "2px 2px white";
  setTimeout(function() {
    document.querySelector(element).style.textShadow = "2px 2px black";
  }, ms);
}

// Game Over
function gameOver() {
  // Message
  document.querySelector("h1").innerText = "Game Over!";
  scorePossible = false;

  // Background
  document.querySelector("body").style.background = "red";

  // TimeOut/Reset
  setTimeout(function() {
    location.reload();
  }, 2000);
}

// Main Loop
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  //Collision Detection: Side Wall => reverse x direction if hit.
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  //Collision Detection: Top Wall => reverse y direction if hit.
  if (y + dy < ballRadius) {
    dy = -dy;
    scorePossible = true;
  }

  //Collision Detection: Paddle Hit =>
  if(
      y + dy > canvas.height - paddleHeight - ballRadius + 2 - paddleGap  &&
      x + dx > paddleX &&
      x + dx < paddleX + paddleWidth &&
      scorePossible == true
    ){
      // reverse y direction on ball
      dy = -dy;

      // increment score
      scoreUpdate();

      // speed up ball
      dy = dy * 1.05;
      dx = dx * 1.05;
      console.log(dy);
      console.log(dx);

      // Shrink paddle
      shrinkPaddle();

      // calculate cash currentBalance
      updateCash();

      // Visual
      flashElement(120, "canvas");
      flashElementText(80, "h2");
    }


  // game over Detection
  if (y + dy > canvas.height) {
    gameOver();
  }

  // move ball to new postion
  x = x + dx;
  y = y + dy;

  // move paddle to new position if controller pressed
  if (leftPressed && paddleX > 0) {
    paddleX -= paddleDx;
  }

  if (rightPressed && (paddleX + paddleWidth) < canvas.width) {
    paddleX += paddleDx;
  }

  // update frame
  requestAnimationFrame(draw);
}

// initialize game
var score = 0;
var scorePossible = true;
var currentBalance = 0;
var interestRate = 1;
var totalGoldEarned = 0;
displayBalance();
displayInterest();


requestAnimationFrame(draw);

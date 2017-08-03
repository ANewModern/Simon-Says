//-------------------------------------------------------------------------------------------------------------------------

const boxes = document.querySelectorAll(".box"); //array of all the divs with a class of .box
const start = document.querySelector(".start"); //selecting the start button
const reset = document.querySelector(".reset"); //selecting the reset button

let gameHistory //initializes game history variable
let userHistory = [] //User history
let currentHistory = [] //History for current game
let currentSteps = 0; //How many buttons have been pressed
let totalSteps = 1; //How many buttons can be pressed in the current game
let steps = 0; //steps for the setInterval

let playingGame = false; //Flag to check if game is running
let gameSteps = true; //Flag to make sure that colored buttons can only be pressed a # of times
let gameStarts = false; //Flag to start game
let gameReset = false; //Resets the game

//-------------------------------------------------------------------------------------------------------------------------

function gameCreator() { //returns an array of 40 random moves
  return [...new Array(40)].map(() => Math.round(Math.random() * 3));
}

function resetGame() { //resets the values of the game
  steps = 0;
  totalSteps = 1;
  currentHistory = [];
  userHistory = [];
  playingGame = false;
  console.log("Game variables reset");
}

function lightButton(num) { //function that lights up the buttons
  let colors = ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)", "rgba(0, 0, 255, 1)", "rgba(255, 255, 0, 1)"]; //array of colors to use for when the buttons are pressed or shown
  let colorsFirst = ["rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(0, 0, 255, 0.5)", "rgba(255, 255, 0, 0.5)"]; //array of colors to use for when the buttons are pressed or shown
  let dark = false; //flag for turning a button dark

  var colored = setInterval(function() { //interval for changing the colors on the buttons
    if (dark) { //checks the flag to see if the button should be dark or bright
      document.getElementById("box" + num).style.backgroundColor = colorsFirst[num]; //changes the color to dark
      clearInterval(colored); // stops the interval
      return;
    }
    document.getElementById("box" + num).style.backgroundColor = colors[num]; //changes the color to bright
    dark = !dark; //set flag to true
  }, 600);
  return;
}

function gameMove() { //function that visualizes the moves that the user has to press
  if (!playingGame) { //checks to see if the game has already started or is starting
    gameHistory = gameCreator(); //creates an array for the game
    console.log(gameHistory);
    totalSteps = 1;
    currentHistory = [];
    userHistory = [];
    playingGame = true;
  }
  let currentMoves = gameHistory.slice(0, totalSteps);
  console.log(currentMoves);

  steps = 0;
  let lightUp = setInterval(function() { 
    if (steps >= currentMoves.length) {
      currentSteps = 0;
      gameSteps = true;
      clearInterval(lightUp);
    } else if (steps < currentMoves.length) {
      lightButton(currentMoves[steps]);
    }
    steps++;
  }, 1200);

}

function onClick() { //function for when the user clicks on one of the colored buttons
  if (playingGame && gameSteps) { //Checks the playingGame & gameSteps flag
    for (var i = 0; i < 4; i++) { //Checks what colored button was pressed and adds it to the currentHistory
      if (this === boxes[i]) {
        currentHistory.push(i);
        //console.log(currentHistory);
        if (i !== gameHistory[currentSteps]) { //if user presses wrong colored button, game over
          playingGame = !playingGame;
          console.log("Game Over", userHistory);
        } else {
          currentSteps++; //adds to the number of moves done
          if (currentSteps === totalSteps) { //checks if the player made all the steps
            userHistory.push(currentHistory); //updates the user game history
            currentHistory = [];
            gameSteps = false;
            totalSteps++;
            gameMove(); //adds another move for the user
          }
        }
      }
    }
  }
}

//-------------------------------------------------------------------------------------------------------------------------

reset.addEventListener("click", resetGame); //resets the variables for the game
start.addEventListener("click", gameMove); //sets and event listener to the start button
boxes.forEach(box => box.addEventListener("click", onClick)); //sets an event listener to the letters

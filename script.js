let gameWins = 0;
let playerRounds = 0;
let computerRounds = 0;
const gameStatus = document.getElementById("gameStatus");
const resultMessage = document.getElementById("resultMessage");
const computer = document.querySelector(".computer img");
const player = document.querySelector(".player img");
const computerPoints = document.querySelector(".computerPoints");
const playerPoints = document.querySelector(".playerPoints");
const options = document.querySelectorAll(".options button");


// Function to reset the round
function resetRound() {
  playerRounds = 0;
  computerRounds = 0;
  playerPoints.innerHTML = 0;
  computerPoints.innerHTML = 0;
  resultMessage.style.display = "none";
  restartButton.style.display = "none";
}

// Function to restart the game
function restartGame() {
  resetRound();
  gameWins = 0; // Reset game wins
  gameStatus.innerHTML = "0/10 Games Won"; // Reset game status
  document.getElementById("clue").style.display = "none"; // Hide clue
  document.getElementById("exit").style.display = "none"; // Hide exit button
}
function exitGame() {
  alert("Thank you for playing!");
  window.close();
}

// Function to display result message for 5 seconds
function displayResultMessage(message) {
  resultMessage.innerHTML = message;
  resultMessage.style.display = "block";
  setTimeout(() => {
    resultMessage.style.display = "none";
  }, 5000); // Hide message after 5 seconds
}

// Add event listener to options buttons
options.forEach((option) => {
  option.addEventListener("click", () => {
    if (gameWins === 3) return; // Stop the game if 10 wins are achieved

    computer.classList.add("shakeComputer");
    player.classList.add("shakePlayer");

    setTimeout(() => {
      computer.classList.remove("shakeComputer");
      player.classList.remove("shakePlayer");

      player.src = "./" + option.innerHTML + "Player.png";

      const choice = ["STONE", "PAPER", "SCISSORS"];
      let arrayNo = Math.floor(Math.random() * 3);
      let computerChoice = choice[arrayNo];
      computer.src = "./" + computerChoice + "Computer.png";

      let cPoints = parseInt(computerPoints.innerHTML);
      let pPoints = parseInt(playerPoints.innerHTML);

      if (
        (option.innerHTML === "STONE" && computerChoice === "SCISSORS") ||
        (option.innerHTML === "PAPER" && computerChoice === "STONE") ||
        (option.innerHTML === "SCISSORS" && computerChoice === "PAPER")
      ) {
        playerPoints.innerHTML = pPoints + 1;
        playerRounds++;
      } else if (option.innerHTML === computerChoice) {
        // Tie - No Points
      } else {
        computerPoints.innerHTML = cPoints + 1;
        computerRounds++;
      }

      if (playerRounds === 3) {
        gameWins++;
        gameStatus.innerHTML = `${gameWins}/10 Games Won`;
        displayResultMessage("Player Wins!");
        setTimeout(() => {
          resetRound(); // Automatically start the next game after 5 seconds
        }, 2000);
      } else if (computerRounds === 3) {
        displayResultMessage("Computer Wins!");
        setTimeout(() => {
          resetRound(); // Automatically start the next game after 5 seconds
        }, 2000);
      }

      if (gameWins === 3) {
        document.getElementById("clue").style.display = "block";
        document.getElementById("exit").style.display = "block";
      }
    }, 500); // Adjust the timeout duration if needed
  });
});



let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const UserScorePara = document.querySelector("#user-score");
const CompScorePara = document.querySelector("#comp-score");
const Resetbutton=document.querySelector(".reset-btn");

const image={
  rock:"images/stone.png",
  paper:"images/paper.png",
  scissors:"images/scissors.png",

};
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};
//both choices  same
const drawGame = () => {
 
   msg.innerText = "GAME WAS DRAW. PLAY AGAIN!";
   msg.style.backgroundColor = "#081b31";
  
};

const showWinner = (userWin, userChoice, compChoice) => {
  // const userImage=images[userChoice];
  // const compImage=images[compChoice];

  if (userWin) {
    userScore++;
    UserScorePara.innerText = userScore;

    msg.innerText = `YOU WIN! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    CompScorePara.innerText = compScore;
    UserScorePara.innerText = userScore;

    msg.innerText = `YOU LOSE! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  //generate computer choice
  const compChoice = genCompChoice();

  if (userChoice == compChoice) {
    //draw game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //paper,scissor
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock,scissor
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock,paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};
//reset scores
const resetGame=()=>{
  userScore = 0;
  compScore = 0;
  UserScorePara.innerText=userScore;
  CompScorePara.innerText=compScore;
  msg.innerText="Play your move!";
  msg.style.backgroundColor="#081b31";

}
Resetbutton.addEventListener("click",resetGame);

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");

    playGame(userChoice);
  });
});

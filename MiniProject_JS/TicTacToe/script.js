let button = document.querySelectorAll(".btn");
let resetbutton = document.querySelector(".reset-btn");
let newgame = document.querySelector(".new-btn");
let msgcont = document.querySelector(".cmsg");
let msg = document.querySelector("#msg");
let count = 0;
turnO = true;

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetgame = () => {
  turnO = true;
  count = 0;
  enablebutton();
  msgcont.classList.add("hide");
};
const newgames = () => {
  turnO = true;
  count = 0;
  enablebutton();
  msgcont.classList.add("hide");
};

button.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("button clicked");
    if (turnO) {
      btn.innerText = "O";
      btn.classList.add("o-color");
      btn.classList.remove("x-color");
      turnO = false;
    } else {
      btn.innerText = "X";
      btn.classList.add("x-color");
      btn.classList.remove("o-color");
      turnO = true;
    }
    btn.disabled = true;
    count++;
    let iswinner = checkWinner();
    if (count == 9 && !iswinner) {
      gameDraw();
    }
  });
});
const gameDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgcont.classList.remove("hide");
  disablebutton();
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = button[pattern[0]].innerText;
    let pos2 = button[pattern[1]].innerText;
    let pos3 = button[pattern[2]].innerText;
    // console.log(`Checking pattern: ${pattern} => ${pos1}, ${pos2}, ${pos3}`);  Debugging log
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner", pos1);
        showWinner(pos1);
        return true;
      }
    }
  }
  return false;
};

const enablebutton = () => {
  for (let btn of button) {
    btn.disabled = false;
    btn.innerText = "";
    btn.classList.remove("o-color", "x-color");
  }
};
const disablebutton = () => {
  for (let btn of button) {
    btn.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congrulations! Winner is ${winner}`;
  msgcont.classList.remove("hide");
  disablebutton();
};
resetbutton.addEventListener("click", resetgame);
newgame.addEventListener("click", newgames);

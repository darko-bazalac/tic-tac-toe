const O_CLASS = "o";
const X_CLASS = "x";
const WINING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const fieldEls = document.querySelectorAll("[data-field]");
const board = document.getElementById("board");
const winTextEL = document.querySelector("[data-win-msg]");
const winEl = document.getElementById("winningMessage");
const restartBtn = document.getElementById("restartButton");
let oTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  fieldEls.forEach((field) => {
    field.classList.remove(X_CLASS);
    field.classList.remove(O_CLASS);
    field.removeEventListener("click", handleClick);
    field.addEventListener("click", handleClick, { once: true });
  });
  setHoverEffect();
  winEl.classList.remove("show");
}

function handleClick(e) {
  //placeMark
  let turn = oTurn ? O_CLASS : X_CLASS;
  let field = e.target;
  field.classList.add(turn);
  //Check for Win
  if (checkWin(turn)) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    //Swap Turns
    oTurn = !oTurn;
    setHoverEffect();
  }
}

function endGame(isDraw) {
  if (isDraw) {
    winTextEL.textContent = "Draw!";
  } else {
    winTextEL.textContent = `${oTurn ? "O's" : "X's"} wins!`;
  }
  winEl.classList.add("show");
}

function checkDraw() {
  return [...fieldEls].every((field) => {
    return (
      field.classList.contains(X_CLASS) || field.classList.contains(O_CLASS)
    );
  });
}

function setHoverEffect() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(turn) {
  return WINING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return fieldEls[index].classList.contains(turn);
    });
  });
}
